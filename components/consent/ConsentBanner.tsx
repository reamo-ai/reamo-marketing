"use client";

import Link from "next/link";

interface ConsentBannerProps {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onManagePreferences: () => void;
}

const CCPA_OPT_OUT_URL = "https://app.retention.com/ccpa_details/";

// Layer 1: unobtrusive fixed bottom bar shown on first visit only.
export default function ConsentBanner({
  onAcceptAll,
  onRejectNonEssential,
  onManagePreferences,
}: ConsentBannerProps) {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[210] border-t border-border bg-surface/95 px-page py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-secondary">
          We use cookies to operate our site and, with your permission, to recognize
          returning visitors and identify companies and individuals visiting reamo.ai for
          sales and marketing purposes. See our{" "}
          <Link href="/privacy-policy" className="text-accent hover:underline">
            Privacy Policy
          </Link>{" "}
          for details. California residents can opt out of this identification under the
          CCPA/CPRA{" "}
          <a
            href={CCPA_OPT_OUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            here
          </a>
          .
        </p>
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-shrink-0">
          <button
            type="button"
            onClick={onManagePreferences}
            className="min-h-[44px] rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-input focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Manage Preferences
          </button>
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="min-h-[44px] rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-input focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="min-h-[44px] rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
