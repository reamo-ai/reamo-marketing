'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const inputClass =
  'w-full min-w-0 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-base text-white placeholder-[rgba(255,255,255,0.32)] outline-none transition-colors focus:border-brand-blue-light focus:ring-0 disabled:opacity-60 sm:text-sm';

const selectClass = `${inputClass} appearance-none`;

const labelClass =
  'font-[family-name:var(--font-dm-sans),sans-serif] text-xs font-medium uppercase tracking-wide text-[rgba(255,255,255,0.45)]';

type FormStatus = 'idle' | 'loading' | 'error' | 'success';

const TEAM_SIZES = ['Just me', '2-5', '6-15', '16-30', '31-75', '76+'];

const ROLES = ['Team Lead', 'Broker / Broker-Owner', 'Ops / Transaction Coordinator', 'Other'];

const REDIRECT_DELAY_MS = 3000;

export default function RequestAccessForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => router.push('/'), REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          role: formData.get('role'),
          teamSize: formData.get('teamSize'),
          phoneSystem: formData.get('phoneSystem'),
          crm: formData.get('crm'),
          transactionPlatform: formData.get('transactionPlatform'),
          notes: formData.get('notes'),
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
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <>
      {status === 'success' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] px-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-success-title"
            className="w-full max-w-md rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#171717] p-8 text-center shadow-xl"
          >
            <p className="section-eyebrow text-brand-blue-light">Application received</p>
            <h2
              id="waitlist-success-title"
              className="mt-2 text-2xl font-bold tracking-tight text-white"
            >
              Thank you!
            </h2>
            <p className="mt-3 font-[family-name:var(--font-dm-sans),sans-serif] text-base leading-[1.55] text-neutral-400">
              We&apos;ll review your application and be in touch shortly. Redirecting you home…
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 text-left">
      <div className="absolute left-[-9999px] top-0" aria-hidden>
        <label htmlFor="ra-website">Website</label>
        <input id="ra-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ra-first-name" className={labelClass}>
            First Name
          </label>
          <input
            id="ra-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="Jane"
            required
            disabled={status === 'loading' || status === 'success'}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ra-last-name" className={labelClass}>
            Last Name
          </label>
          <input
            id="ra-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Smith"
            required
            disabled={status === 'loading' || status === 'success'}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ra-email" className={labelClass}>
            Email Address
          </label>
          <input
            id="ra-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@brokerage.com"
            required
            disabled={status === 'loading' || status === 'success'}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ra-phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="ra-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            required
            disabled={status === 'loading' || status === 'success'}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ra-company" className={labelClass}>
          Company / Brokerage
        </label>
        <input
          id="ra-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Smith Realty Group"
          required
          disabled={status === 'loading' || status === 'success'}
          className={inputClass}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="ra-role" className={labelClass}>
            Your Role
          </label>
          <select
            id="ra-role"
            name="role"
            required
            disabled={status === 'loading' || status === 'success'}
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select your role
            </option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="ra-team-size" className={labelClass}>
            Team Size
          </label>
          <select
            id="ra-team-size"
            name="teamSize"
            required
            disabled={status === 'loading' || status === 'success'}
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select team size
            </option>
            {TEAM_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ra-phone-system" className={labelClass}>
          Phone System
        </label>
        <input
          id="ra-phone-system"
          name="phoneSystem"
          type="text"
          placeholder="QUO, RingCentral, Dialpad, Google Voice, Personal Cell…"
          required
          disabled={status === 'loading' || status === 'success'}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ra-crm" className={labelClass}>
          CRM
        </label>
        <input
          id="ra-crm"
          name="crm"
          type="text"
          placeholder="Follow Up Boss, Lofty, Boldtrail…"
          required
          disabled={status === 'loading' || status === 'success'}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ra-transaction-platform" className={labelClass}>
          Transaction Platform
        </label>
        <input
          id="ra-transaction-platform"
          name="transactionPlatform"
          type="text"
          placeholder="Dotloop, SkySlope, Brokermint…"
          required
          disabled={status === 'loading' || status === 'success'}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="ra-notes" className={labelClass}>
          Anything else we should know? (optional)
        </label>
        <textarea
          id="ra-notes"
          name="notes"
          rows={4}
          placeholder="Current pain points, timeline, questions…"
          disabled={status === 'loading' || status === 'success'}
          className={`resize-none ${inputClass}`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-black transition-opacity hover:opacity-88 disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting…' : 'Join the waitlist'}
      </button>

      {status === 'error' && errorMessage && (
        <p className="text-sm font-normal text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
      </form>
    </>
  );
}
