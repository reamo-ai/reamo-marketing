'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-input)] px-4 py-3 text-sm text-primary placeholder-[var(--color-text-secondary)] outline-none transition-colors focus:border-accent focus:ring-0';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const param = searchParams.get('email');
    if (param) {
      setEmail(param);
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(data.message || "You've been unsubscribed.");
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        Unsubscribe
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
        Enter your email to stop receiving product updates from Reamo.
      </p>

      <div
        className="mt-6 h-px w-full"
        style={{
          background: 'linear-gradient(to right, rgba(0,212,160,0.4), transparent)',
        }}
      />

      {status === 'success' ? (
        <p className="mt-8 text-sm leading-relaxed text-primary">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="unsubscribe-email"
              className="text-xs font-medium uppercase tracking-wide text-secondary"
            >
              Email address
            </label>
            <input
              id="unsubscribe-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@brokerage.com"
              className={inputClass}
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
          >
            {status === 'loading' ? 'Unsubscribing…' : 'Unsubscribe'}
          </button>

          {status === 'error' && message && (
            <p className="text-sm text-red-400" role="alert">
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
