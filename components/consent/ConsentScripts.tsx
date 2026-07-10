"use client";

import { useEffect } from "react";
import type { ConsentState } from "@/lib/consent";

// Injects consent-gated third-party scripts. Nothing here loads until the
// relevant category is granted in the consent cookie. Because injection is
// driven by the `consent` prop (owned by ConsentManager, which updates it on
// mount and on every consent-change event), toggling a category on will inject
// the script immediately — no page reload. Toggling off cannot "un-fire" an
// already-loaded script, but the guards below stop it loading on future loads.

// Module-level guards so a script is only injected once per page load, even if
// the component re-renders or consent changes several times.
let rb2bInjected = false;
let analyticsInjected = false;

function injectRb2b() {
  if (rb2bInjected || typeof window === "undefined") return;
  // Skip in dev/preview so non-production traffic doesn't pollute RB2B data.
  if (process.env.NODE_ENV !== "production") return;
  if ((window as unknown as { reb2b?: unknown }).reb2b) {
    rb2bInjected = true;
    return;
  }
  rb2bInjected = true;
  const script = document.createElement("script");
  script.textContent = `!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("W6Z57HZKWROX");`;
  document.head.appendChild(script);
}

function injectAnalytics() {
  if (analyticsInjected || typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  analyticsInjected = true;
  // Placeholder: no analytics vendor is wired up yet. When one is added (e.g.
  // GA/Plausible), inject its snippet here — it will already be gated behind
  // the `analytics` consent category by the effect below.
}

export default function ConsentScripts({
  consent,
}: {
  consent: ConsentState | null;
}) {
  useEffect(() => {
    if (consent?.visitor_id) injectRb2b();
  }, [consent?.visitor_id]);

  useEffect(() => {
    if (consent?.analytics) injectAnalytics();
  }, [consent?.analytics]);

  return null;
}
