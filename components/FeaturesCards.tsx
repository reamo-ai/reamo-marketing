import { ReactNode } from 'react';

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a2e27]">
      {children}
    </div>
  );
}

const iconClass = 'h-5 w-5 text-accent';

const features = [
  {
    id: 'call-notes',
    title: 'Real Estate Call Notes',
    body: 'Post-call summaries and running client notes, written automatically and trained on specialized real estate terminology - not generalized.',
    icon: (
      <IconBadge>
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="4" y="3" width="14" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h6M8 11h6M8 15h4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v2h6V3" />
        </svg>
      </IconBadge>
    ),
  },
  {
    id: 'dotloop',
    title: 'Dotloop Loops Automated',
    body: "As soon as a client says they're ready to move forward, Reamo creates a loop and populates every detail, so you can autofill your docs in seconds.",
    icon: (
      <IconBadge>
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 13 C2.8 6 4 6 4.8 13 C5.6 21 6.8 21 7.6 13 C8.4 9 9.4 9 10 13 C10.6 18 11.6 18 12.4 13 C13.2 7 14.4 7 15.2 13 C16 20 17 20 17.8 13 C18.6 8 19.8 8 21 13" />
          <line x1="3" y1="17" x2="21" y2="17" strokeLinecap="round" />
        </svg>
      </IconBadge>
    ),
  },
  {
    id: 'calendar',
    title: 'Calendar Managed',
    body: "Appointments created, updated, and protected from double-booking. Reamo handles the logistics so you don't have to.",
    icon: (
      <IconBadge>
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </IconBadge>
    ),
  },
  {
    id: 'life-events',
    title: 'Life Events Captured',
    body: 'Job changes, milestones, and moving timelines flagged for follow-up. Nothing said on a call is ever lost or forgotten.',
    icon: (
      <IconBadge>
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8.5V20a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V8.5" />
        </svg>
      </IconBadge>
    ),
  },
  {
    id: 'follow-up',
    title: 'Follow-Up Tasks',
    body: 'Never forget to follow up on anything again. Every task you need to do after each call is added to a checklist.',
    icon: (
      <IconBadge>
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconBadge>
    ),
  },
  {
    id: 'crm',
    title: 'CRM-Ready Sheets',
    body: 'Quickly export CSV straight from your Reamo dashboard and right into your CRM. No more manual entry.',
    icon: (
      <IconBadge>
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h7" />
        </svg>
      </IconBadge>
    ),
  },
];

export default function FeaturesCards() {
  return (
    <section className="relative z-10 bg-[var(--color-background)] px-10 pb-16 sm:px-16 lg:px-24 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative flex min-w-0 flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-green)] hover:shadow-[0_0_24px_rgba(0,212,160,0.08)]"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(to right, transparent, var(--color-accent), transparent)',
                }}
              />
              {feature.icon}
              <h3 className="text-base font-semibold text-primary">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
