"use client";

import { useCallback, useEffect, useState } from "react";
import ConsentBanner from "./ConsentBanner";
import ConsentPreferences from "./ConsentPreferences";
import ConsentScripts from "./ConsentScripts";
import type { ConsentChoices, ConsentState } from "@/lib/consent";
import { OPEN_PREFERENCES_EVENT, readConsent, writeConsent } from "@/lib/consent";

// Top-level consent orchestrator, mounted once in the root layout so it covers
// every marketing page. Owns the canonical consent state, shows the first-visit
// banner, opens the preferences modal (from the banner or the footer link), and
// feeds consent to the gated script injectors.
export default function ConsentManager() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  // Read the cookie on mount (client-side, so the statically-rendered pages
  // stay static). Returning users with valid consent never see the banner.
  useEffect(() => {
    const existing = readConsent();
    setConsent(existing);
    setBannerVisible(existing === null);
    setMounted(true);
  }, []);

  // Let the footer "Cookie Settings" link (or anything else) open the modal.
  useEffect(() => {
    const open = () => setPrefsOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  const commit = useCallback((choices: ConsentChoices) => {
    setConsent(writeConsent(choices));
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

  return (
    <>
      <ConsentScripts consent={consent} />
      {mounted && bannerVisible && !prefsOpen && (
        <ConsentBanner
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onManagePreferences={() => setPrefsOpen(true)}
        />
      )}
      {mounted && prefsOpen && (
        <ConsentPreferences
          initial={consent}
          onSave={commit}
          onClose={() => setPrefsOpen(false)}
        />
      )}
    </>
  );
}
