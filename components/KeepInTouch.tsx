'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-3 text-sm font-normal text-primary placeholder-[var(--color-text-secondary)] outline-none transition-colors focus:border-accent focus:ring-0 disabled:opacity-60';

const labelClass =
  'text-xs font-normal uppercase tracking-wide text-secondary';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function Field({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  required,
  disabled,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClass}
      />
    </div>
  );
}

const topLine =
  'linear-gradient(to right, transparent, rgba(0,212,160,0.2), transparent)';

export default function KeepInTouch() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          website: formData.get('website'),
        }),
      });

      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(data.message || 'Thanks for subscribing!');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="relative z-10 w-full bg-[var(--color-background)] py-14 sm:py-16 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: topLine }}
      />

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-10 sm:px-16 lg:gap-10 lg:px-24"
      >
        <div className="max-w-md text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Keep in touch
          </p>
          <p className="mt-2 space-y-2 text-pretty text-sm font-normal leading-relaxed text-primary sm:text-base">
            <span className="block">We&apos;re moving fast!</span>
            <span className="block">
              Get instant updates about new
              <br />
              <span className="whitespace-nowrap">
                integrations and features in Reamo.
              </span>
            </span>
          </p>
        </div>

        <div className="relative flex w-full max-w-sm flex-col gap-4">
          <div className="absolute left-[-9999px] top-0" aria-hidden>
            <label htmlFor="keep-in-touch-website">Website</label>
            <input
              id="keep-in-touch-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Field
              id="keep-in-touch-first-name"
              name="firstName"
              label="First name"
              autoComplete="given-name"
              placeholder="Jane"
              disabled={status === 'loading' || status === 'success'}
            />
            <Field
              id="keep-in-touch-last-name"
              name="lastName"
              label="Last name"
              autoComplete="family-name"
              placeholder="Smith"
              disabled={status === 'loading' || status === 'success'}
            />
          </div>

          <Field
            id="keep-in-touch-email"
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@brokerage.com"
            required
            disabled={status === 'loading' || status === 'success'}
          />

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:self-start"
          >
            {status === 'loading' ? 'Submitting…' : 'Stay in the loop'}
          </button>

          <p className="text-xs font-normal leading-relaxed text-secondary">
            By subscribing you agree to receive product updates from Reamo.{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
          </p>

          {status === 'success' && message && (
            <p className="text-sm font-normal text-accent" role="status">
              {message}
            </p>
          )}
          {status === 'error' && message && (
            <p className="text-sm font-normal text-red-400" role="alert">
              {message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
