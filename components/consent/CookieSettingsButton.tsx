"use client";

import { OPEN_PREFERENCES_EVENT } from "@/lib/consent";

// Persistent footer control that reopens the cookie preferences modal. Styled
// to match the sibling footer links.
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className={
        className ??
        "cursor-pointer border-0 bg-transparent p-0 text-xs text-black/40 no-underline hover:text-black/70"
      }
    >
      Cookie Settings
    </button>
  );
}
