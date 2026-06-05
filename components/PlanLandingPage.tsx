'use client';

import Link from 'next/link';
import { useState } from 'react';
import { demoVideos } from '@/lib/media-sources';

export type PlanId = 'agent' | 'team';

const plans = {
  agent: {
    eyebrow: 'Agent plan',
    title: 'Built for the modern agent',
    description:
      'Connect Reamo to your business phone and let it handle call notes, calendar updates, Dotloop loops, and CRM-ready sheets — automatically while you talk. No new app to learn. No workflow to change.',
    target: 'Individual agents',
    prices: { monthly: '$79', annual: '$63' },
    priceUnit: '/mo',
    ctaBase: 'https://app.reamo.ai/signup',
    features: [
      'Real estate call notes',
      'Real-time CRM sheets',
      'Life events flagged',
      'Follow-ups logged',
      'Dotloop integration',
      'Google calendar management',
      'SMS AI agent (100 msg/mo)',
      '30-day data portability',
    ],
  },
  team: {
    eyebrow: 'Team plan',
    title: 'Built for growing agent teams',
    description:
      'Give every agent on your team the same AI middle office — with a leader dashboard, seat management, and one invoice. Reamo scales admin automation across up to 25 agents without adding headcount.',
    target: 'Up to 25 agents',
    prices: { monthly: '$69', annual: '$55' },
    priceUnit: '/seat/mo',
    ctaBase: 'https://app.reamo.ai/signup/team',
    features: [
      'Everything in Agent',
      'SMS AI agent (200 msg/mo)',
      'Team leader dashboard',
      'Seat management',
      'Single invoice',
      'Email support',
    ],
  },
} as const;

function GreenCheck() {
  return (
    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden>
        <path
          d="M2 5l2.5 2.5L8 3"
          stroke="#00d4a0"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function PlanLandingPage({ plan }: { plan: PlanId }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const config = plans[plan];
  const mode = isAnnual ? 'annual' : 'monthly';
  const ctaHref = isAnnual ? `${config.ctaBase}?interval=annual` : config.ctaBase;

  return (
    <section className="relative z-10 min-h-screen bg-[var(--color-background)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,212,160,0.2), transparent)',
        }}
      />

      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
          {config.eyebrow}
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {config.title}
          <span className="text-accent">.</span>
        </h1>

        <p className="mt-4 text-base leading-relaxed text-secondary">
          {config.description}
        </p>

        <div className="relative mt-6 aspect-video w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] sm:mt-8">
          <video
            controls
            playsInline
            preload="metadata"
            src={demoVideos[plan].src}
            poster={demoVideos[plan].poster}
            className="h-full w-full object-contain sm:object-cover"
            aria-label={`${config.eyebrow} demo video`}
          />
        </div>

        <div
          className="mt-6 h-px w-full"
          style={{
            background: 'linear-gradient(to right, rgba(0,212,160,0.4), transparent)',
          }}
        />

        <div className="mx-auto mt-8 w-full max-w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:mt-10 sm:w-fit sm:p-8">
          <div className="flex flex-col gap-8 text-left md:flex-row md:items-start md:gap-0">
            <div className="min-w-0 shrink-0 md:w-[min(100%,16rem)] md:pr-8 lg:w-56">
              <p className="text-xs font-medium uppercase tracking-widest text-secondary">
                {config.target}
              </p>

              <div className="mt-4 flex flex-wrap items-end justify-start gap-2">
                <span
                  className="text-4xl font-bold tracking-tight text-primary sm:text-5xl"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  {config.prices[mode]}
                </span>
                <span className="pb-1 text-sm text-secondary">{config.priceUnit}</span>
              </div>

              {isAnnual && (
                <p className="mt-2 text-sm text-accent">Billed annually · Save 20%</p>
              )}

              <div className="mt-6 flex items-center justify-start gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={isAnnual}
                  onClick={() => setIsAnnual((prev) => !prev)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    isAnnual ? 'bg-accent' : 'bg-[var(--color-input)]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-primary transition-transform ${
                      isAnnual ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-sm text-secondary">
                  {isAnnual ? 'Annual billing' : 'Monthly billing'}
                </span>
              </div>

              <a
                href={ctaHref}
                className="mt-8 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-center text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90 sm:inline-flex sm:w-auto"
              >
                Get started
              </a>
            </div>

            <div className="min-w-0 shrink-0 border-t border-[var(--color-border)] pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p
                className="hidden text-xs font-medium uppercase tracking-widest text-secondary md:block md:invisible"
                aria-hidden
              >
                {config.target}
              </p>
              <div className="mt-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                  What&apos;s included
                </h2>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-2">
                  {(plan === 'agent'
                    ? [config.features.slice(0, 4), config.features.slice(4)]
                    : [config.features.slice(0, 3), config.features.slice(3)]
                  ).map((column, columnIndex) => (
                    <ul key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-3">
                      {column.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start justify-start gap-2 text-left text-xs leading-snug text-primary sm:text-sm"
                        >
                          <GreenCheck />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-full px-2 text-center text-sm text-secondary sm:mt-10 sm:w-fit sm:px-0">
          <Link href="/#pricing" className="text-accent transition-colors hover:underline">
            Compare all plans
          </Link>
          {' · '}
          Questions?{' '}
          <a
            href="mailto:sales@reamo.ai"
            className="text-accent transition-colors hover:underline"
          >
            sales@reamo.ai
          </a>
        </p>
      </div>
    </section>
  );
}
