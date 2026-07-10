"use client";

import { useCallback, useEffect, useState } from "react";
import ConsentBanner from "./ConsentBanner";
import ConsentPreferences from "./ConsentPreferences";
import ConsentScripts from "./ConsentScripts";
import type { ConsentChoices, ConsentState } from "@/lib/consent";
import {
  OPEN_PREFERENCES_EVENT,
  choicesOf,
  impliedChoices,
  isGpcEnabled,
  readConsent,
  readRegime,
  writeConsent,
} from "@/lib/consent";

// Top-level consent orchestrator, mounted once in the root layout so it covers
// every marketing page. Owns the canonical consent state, applies geo-aware
// defaults (US = opt-out / tracking on by default; everyone else = opt-in),
// honors Global Privacy Control, shows the banner, opens the preferences modal,
// and feeds the effective choices to the gated script injectors.
export default function ConsentManager() {
  const [mounted, setMounted] = useState(false);
  const [stored, setStored] = useState<ConsentState | null>(null);
  // The choices actually in force: an explicit stored choice if present,
  // otherwise the geo/GPC-derived default.
  const [effective, setEffective] = useState<ConsentChoices | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  // Resolve consent on mount (client-side, so the pages stay statically
  // rendered). Returning users with an explicit choice never see the banner;
  // first-time visitors get the regime default and are still shown the notice.
  useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setStored(existing);
      setEffective(choicesOf(existing));
      setBannerVisible(false);
    } else {
      setEffective(impliedChoices(readRegime(), isGpcEnabled()));
      setBannerVisible(true);
    }
    setMounted(true);
  }, []);

  // Let the footer "Cookie Settings" link (or anything else) open the modal.
  useEffect(() => {
    const open = () => setPrefsOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  const commit = useCallback((choices: ConsentChoices) => {
    setStored(writeConsent(choices));
    setEffective(choices);
    setBannerVisible(false);
    setPrefsOpen(false);
  }, []);

  const acceptAll = useCallback(
    () => commit({ analytics: true, visitor_id: true }),
    [commit],
  );
  const rejectNonEssential = useCallback(
    () => commit({ analytics: false, visitor_id: false }),
    [commit],
  );

  // Preferences toggles reflect the current effective state (so a US visitor
  // sees categories pre-enabled, a GPC user sees them off, etc.).
  const prefsInitial: ConsentChoices = effective ?? {
    analytics: false,
    visitor_id: false,
  };

  return (
    <>
      <ConsentScripts choices={effective} />
      {mounted && bannerVisible && !prefsOpen && (
        <ConsentBanner
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onManagePreferences={() => setPrefsOpen(true)}
        />
      )}
      {mounted && prefsOpen && (
        <ConsentPreferences
          initial={prefsInitial}
          onSave={commit}
          onClose={() => setPrefsOpen(false)}
        />
      )}
    </>
  );
}
