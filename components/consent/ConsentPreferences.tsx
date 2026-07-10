"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Toggle from "./Toggle";
import type { ConsentChoices, ConsentState } from "@/lib/consent";
import { DEFAULT_CHOICES } from "@/lib/consent";

interface ConsentPreferencesProps {
  /** Existing consent (returning user opening from the footer), or null. */
  initial: ConsentState | null;
  onSave: (choices: ConsentChoices) => void;
  onClose: () => void;
}

const OPT_OUT_URL = "https://app.retention.com/optout";
const CCPA_OPT_OUT_URL = "https://app.retention.com/ccpa_details/";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Layer 2: preferences modal. Strictly-necessary is always on and non-toggleable;
// analytics and visitor identification default off.
export default function ConsentPreferences({
  initial,
  onSave,
  onClose,
}: ConsentPreferencesProps) {
  const [analytics, setAnalytics] = useState(initial?.analytics ?? DEFAULT_CHOICES.analytics);
  const [visitorId, setVisitorId] = useState(initial?.visitor_id ?? DEFAULT_CHOICES.visitor_id);

  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Focus trap: remember prior focus, move focus into the dialog, lock body
  // scroll, keep Tab cycling inside, and close on Escape. Restore on unmount.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const first = dialog?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus();
    };
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    },
    [onClose],
  );

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 px-4 py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        onKeyDown={onKeyDown}
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 id="cookie-prefs-title" className="text-lg font-semibold text-primary">
              Cookie Preferences
            </h2>
            <p className="mt-1 text-sm text-secondary">
              Manage how reamo.ai uses cookies and similar technologies.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cookie preferences"
            className="-mr-2 -mt-1 rounded-md p-2 text-secondary transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <Category
            title="Strictly Necessary"
            description="Login sessions, security, load balancing."
            control={
              <Toggle checked disabled label="Strictly necessary cookies (always on)" />
            }
          />
          <Category
            title="Analytics"
            description="Usage and performance tracking."
            control={
              <Toggle
                checked={analytics}
                onChange={setAnalytics}
                label="Analytics cookies"
                id="consent-analytics"
              />
            }
          />
          <Category
            title="Visitor Identification & Marketing"
            description="Cookies, device IDs, and IP matching used to identify visitor companies and individuals for sales outreach and enrichment."
            control={
              <Toggle
                checked={visitorId}
                onChange={setVisitorId}
                label="Visitor identification and marketing cookies"
                id="consent-visitor-id"
              />
            }
          />
        </div>

        <div className="space-y-4 border-t border-border px-6 py-5">
          <button
            type="button"
            onClick={() => onSave({ analytics, visitor_id: visitorId })}
            className="min-h-[44px] w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Save Preferences
          </button>
          <nav
            aria-label="Privacy links"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-secondary"
          >
            <Link href="/privacy-policy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
            <a href={OPT_OUT_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Opt out of identification
            </a>
            <a href={CCPA_OPT_OUT_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              California (CCPA/CPRA) opt out
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Category({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-input/50 p-4">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-primary">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-secondary">{description}</p>
      </div>
      <div className="pt-0.5">{control}</div>
    </div>
  );
}
