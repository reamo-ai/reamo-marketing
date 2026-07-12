'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const inputClass =
  'w-full min-w-0 rounded-lg border border-[rgba(0,0,0,0.14)] bg-[rgba(0,0,0,0.02)] px-4 py-3 text-base text-black placeholder-[rgba(0,0,0,0.32)] outline-none transition-colors focus:border-brand-blue-light focus:ring-0 disabled:opacity-60 sm:text-sm';

const selectClass = `${inputClass} appearance-none`;

const labelClass =
  'font-[family-name:var(--font-dm-sans),sans-serif] text-xs font-medium uppercase tracking-wide text-[rgba(0,0,0,0.5)]';

type FormStatus = 'idle' | 'loading' | 'error' | 'success';

const CATEGORIES = [
  'CRM',
  'Transaction Management',
  'VoIP & Dialer',
  'Calendar & Scheduling',
  'Marketing & Lead Gen',
  'Other',
];

const USER_BASE_SIZES = [
  'Under 1,000',
  '1,000 – 10,000',
  '10,000 – 50,000',
  '50,000 – 250,000',
  '250,000+',
];

const REDIRECT_DELAY_MS = 3000;

export default function PartnerApplicationForm() {
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
      const response = await fetch('/api/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.get('companyName'),
          contactName: formData.get('contactName'),
          email: formData.get('email'),
          companyWebsite: formData.get('companyWebsite'),
          category: formData.get('category'),
          productDescription: formData.get('productDescription'),
          integrationGoals: formData.get('integrationGoals'),
          userBase: formData.get('userBase'),
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
            aria-labelledby="partner-success-title"
            className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 text-center shadow-xl"
          >
            <p className="section-eyebrow text-brand-blue-light">Application received</p>
            <h2
              id="partner-success-title"
              className="mt-2 text-2xl font-bold tracking-tight text-black"
            >
              Thank you!
            </h2>
            <p className="mt-3 font-[family-name:var(--font-dm-sans),sans-serif] text-base leading-[1.55] text-neutral-600">
              We&apos;ll review your application and be in touch shortly. Redirecting you home…
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 text-left">
        <div className="absolute left-[-9999px] top-0" aria-hidden>
          <label htmlFor="pa-website">Website</label>
          <input id="pa-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="pa-company-name" className={labelClass}>
              Company Name
            </label>
            <input
              id="pa-company-name"
              name="companyName"
              type="text"
              autoComplete="organization"
              placeholder="Acme CRM"
              required
              disabled={status === 'loading' || status === 'success'}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pa-contact-name" className={labelClass}>
              Contact Name
            </label>
            <input
              id="pa-contact-name"
              name="contactName"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              required
              disabled={status === 'loading' || status === 'success'}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="pa-email" className={labelClass}>
              Work Email
            </label>
            <input
              id="pa-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@acmecrm.com"
              required
              disabled={status === 'loading' || status === 'success'}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pa-company-website" className={labelClass}>
              Company Website
            </label>
            <input
              id="pa-company-website"
              name="companyWebsite"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="acmecrm.com"
              required
              disabled={status === 'loading' || status === 'success'}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="pa-category" className={labelClass}>
              Product Category
            </label>
            <select
              id="pa-category"
              name="category"
              required
              disabled={status === 'loading' || status === 'success'}
              defaultValue=""
              className={selectClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pa-user-base" className={labelClass}>
              Estimated User Base (optional)
            </label>
            <select
              id="pa-user-base"
              name="userBase"
              disabled={status === 'loading' || status === 'success'}
              defaultValue=""
              className={selectClass}
            >
              <option value="">Select a range</option>
              {USER_BASE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pa-product-description" className={labelClass}>
            Brief Description of Your Product
          </label>
          <textarea
            id="pa-product-description"
            name="productDescription"
            rows={4}
            placeholder="What your product does and who uses it…"
            required
            disabled={status === 'loading' || status === 'success'}
            className={`resize-none ${inputClass}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pa-integration-goals" className={labelClass}>
            What Would You Want the Integration to Do?
          </label>
          <textarea
            id="pa-integration-goals"
            name="integrationGoals"
            rows={4}
            placeholder="The workflows, data, or actions you'd want Reamo to handle inside your product…"
            required
            disabled={status === 'loading' || status === 'success'}
            className={`resize-none ${inputClass}`}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-near-black px-6 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-88 disabled:opacity-60"
        >
          {status === 'loading' ? 'Submitting…' : 'Submit application'}
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
