// Cookie-consent state, storage, and gating helpers for the reamo.ai marketing
// site. Consent lives in a first-party cookie (NOT localStorage) so it can be
// read server-side if we ever want to gate rendering in middleware/SSR.

export const CONSENT_COOKIE = "reamo_consent";

// Bump this whenever the privacy policy changes materially. A stored consent
// whose policy_version differs is treated as stale, and the banner re-prompts.
// Kept in sync with the privacy policy effective date (app/privacy-policy).
export const POLICY_VERSION = "2026-07-07";

// Consent is valid for 12 months, after which we re-prompt.
export const CONSENT_MAX_AGE_DAYS = 365;

// Fired on window whenever consent changes, so script injectors can react
// without a page reload.
export const CONSENT_CHANGE_EVENT = "reamo:consent-change";

// Fired on window to open the preferences modal (e.g. from the footer link).
export const OPEN_PREFERENCES_EVENT = "reamo:open-cookie-preferences";

export type ConsentCategory = "necessary" | "analytics" | "visitor_id";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  visitor_id: boolean;
  timestamp: string; // ISO 8601
  policy_version: string;
}

export type ConsentChoices = Pick<ConsentState, "analytics" | "visitor_id">;

export const DEFAULT_CHOICES: ConsentChoices = {
  analytics: false,
  visitor_id: false,
};

function isConsentState(value: unknown): value is ConsentState {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    v.necessary === true &&
    typeof v.analytics === "boolean" &&
    typeof v.visitor_id === "boolean" &&
    typeof v.timestamp === "string" &&
    typeof v.policy_version === "string"
  );
}

function isExpired(state: ConsentState): boolean {
  const ts = Date.parse(state.timestamp);
  if (Number.isNaN(ts)) return true;
  const ageMs = Date.now() - ts;
  return ageMs > CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}

/**
 * Returns a valid, current consent state, or null if the user must be
 * (re-)prompted — i.e. no cookie, malformed cookie, expired, or the policy
 * version has been bumped since consent was recorded.
 */
export function parseConsent(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return null;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(decoded);
  } catch {
    return null;
  }
  if (!isConsentState(parsed)) return null;
  if (parsed.policy_version !== POLICY_VERSION) return null;
  if (isExpired(parsed)) return null;
  return parsed;
}

/** Reads and validates the consent cookie in the browser. */
export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  return parseConsent(match?.slice(CONSENT_COOKIE.length + 1));
}

/**
 * Persists the user's choices to the consent cookie (stamped with the current
 * time and policy version) and dispatches CONSENT_CHANGE_EVENT so script
 * injectors can react immediately. Returns the state that was written.
 */
export function writeConsent(choices: ConsentChoices): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: choices.analytics,
    visitor_id: choices.visitor_id,
    timestamp: new Date().toISOString(),
    policy_version: POLICY_VERSION,
  };

  if (typeof document !== "undefined") {
    const value = encodeURIComponent(JSON.stringify(state));
    const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
    const secure =
      typeof location !== "undefined" && location.protocol === "https:"
        ? "; Secure"
        : "";
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
    window.dispatchEvent(
      new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: state }),
    );
  }

  return state;
}

// --- Geo-aware defaults -----------------------------------------------------
//
// Consent DEFAULTS vary by visitor location. `middleware.ts` reads Cloudflare's
// CF-IPCountry header and stores the ISO country code in the (non-httpOnly)
// GEO_COOKIE so the client can pick a regime. This only sets the *default*;
// an explicit choice (stored consent cookie) and Global Privacy Control always
// win over it.

export const GEO_COOKIE = "reamo_geo";

// "opt-out" = non-essential tracking on by default (US). "opt-in" = off until
// the visitor explicitly accepts (EU/EEA/UK, every other country, and unknown
// geo — the conservative fallback). This binary mirrors the privacy policy,
// which limits person-level visitor identification to US visitors.
export type ConsentRegime = "opt-in" | "opt-out";

export function regimeForCountry(country: string | null | undefined): ConsentRegime {
  return country?.toUpperCase() === "US" ? "opt-out" : "opt-in";
}

/** Reads the geo cookie set by middleware and derives the regime (client-side). */
export function readRegime(): ConsentRegime {
  if (typeof document === "undefined") return "opt-in";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${GEO_COOKIE}=`));
  return regimeForCountry(match?.slice(GEO_COOKIE.length + 1));
}

/** True when the browser is sending a Global Privacy Control opt-out signal. */
export function isGpcEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    (navigator as unknown as { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

/**
 * The effective choices to apply when the visitor has NOT made an explicit
 * choice yet. GPC forces everything off regardless of regime (legally required
 * in CA/CO); otherwise the regime default applies.
 */
export function impliedChoices(regime: ConsentRegime, gpc: boolean): ConsentChoices {
  if (gpc) return { analytics: false, visitor_id: false };
  return regime === "opt-out"
    ? { analytics: true, visitor_id: true }
    : { analytics: false, visitor_id: false };
}

/** Narrows a full consent state (or null) to just the category choices. */
export function choicesOf(state: ConsentState | null): ConsentChoices | null {
  if (!state) return null;
  return { analytics: state.analytics, visitor_id: state.visitor_id };
}
