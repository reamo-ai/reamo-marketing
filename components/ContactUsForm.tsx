'use client';

import { FormEvent, useState } from 'react';

const inputClass =
  'w-full min-w-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-3 text-base text-primary placeholder-[var(--color-text-secondary)] outline-none transition-colors focus:border-accent focus:ring-0 disabled:opacity-60 sm:text-sm';

type FormStatus = 'idle' | 'loading' | 'error';

export default function ContactUsForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      });

      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        return;
      }

      form.reset();
      setStatus('idle');
      setShowSuccessModal(true);
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="absolute left-[-9999px] top-0" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

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
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              required
              disabled={status === 'loading'}
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
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              required
              disabled={status === 'loading'}
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
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@brokerage.com"
            required
            disabled={status === 'loading'}
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
            name="subject"
            type="text"
            placeholder="Beta access, partnerships, support…"
            required
            disabled={status === 'loading'}
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
            name="message"
            rows={6}
            placeholder="Tell us what's on your mind…"
            required
            disabled={status === 'loading'}
            className={`resize-none ${inputClass}`}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90 disabled:opacity-60 sm:inline-flex sm:w-auto"
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </button>

        {status === 'error' && errorMessage && (
          <p className="text-sm font-normal text-red-400" role="alert">
            {errorMessage}
          </p>
        )}
      </form>

      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="presentation"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-input)] p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-accent">
              Message sent
            </p>
            <h2
              id="contact-success-title"
              className="mt-2 text-2xl font-bold tracking-tight text-primary"
            >
              Thank you!
            </h2>
            <p className="mt-3 text-base leading-[1.55] text-secondary">
              We&apos;ll be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-8 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
