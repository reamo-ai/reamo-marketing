'use client';

const inputClass =
  'rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-3 text-sm text-primary placeholder-[var(--color-text-secondary)] outline-none transition-colors focus:border-accent focus:ring-0';

export default function ContactUsForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="first-name"
            className="text-xs font-medium uppercase tracking-wide text-secondary"
          >
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="last-name"
            className="text-xs font-medium uppercase tracking-wide text-secondary"
          >
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            autoComplete="family-name"
            placeholder="Smith"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-medium uppercase tracking-wide text-secondary"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jane@brokerage.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-xs font-medium uppercase tracking-wide text-secondary"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Beta access, partnerships, support…"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-xs font-medium uppercase tracking-wide text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us what's on your mind…"
          className={`resize-none ${inputClass}`}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90 sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
