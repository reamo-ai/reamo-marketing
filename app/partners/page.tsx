import { Metadata } from 'next';
import Link from 'next/link';
import PartnerApplicationForm from '@/components/PartnerApplicationForm';
import SectionRevealItem from '@/components/SectionRevealItem';

export const metadata: Metadata = {
  title: 'Become an Integration Partner | Reamo',
  description:
    'Reamo turns real estate agents’ calls into action inside the tools they already use. Partner with Reamo to put your platform inside the post-call workflow.',
  openGraph: {
    title: 'Become a Reamo Integration Partner',
    description:
      'Reamo turns agents’ calls into action inside the tools they already use. Put your platform inside the post-call workflow.',
    url: 'https://reamo.ai/partners',
    siteName: 'Reamo',
    type: 'website',
  },
};

const DESCRIPTOR_CLASS =
  'm-0 font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(17.4px,1.5vw,20.4px)] font-medium leading-[1.55] text-neutral-600';

const SUBHEADER_CLASS =
  'font-montserrat [font-size:var(--paragraph-header-size)] font-bold leading-[1.3] text-black';

const CURRENT_INTEGRATIONS = [
  { name: 'Follow Up Boss', category: 'CRM' },
  { name: 'Lofty', category: 'CRM' },
  { name: 'Dotloop', category: 'Transaction Management' },
  { name: 'QUO', category: 'Phone System' },
  { name: 'RingCentral', category: 'Phone System' },
  { name: 'Google', category: 'Calendar & Email' },
  { name: 'Microsoft', category: 'Calendar & Email' },
] as const;

const WORKFLOW_POINTS = [
  {
    title: 'Updated before the agent leaves the driveway.',
    body: 'Records change seconds after a call ends. No data entry, no end-of-day backlog, no “I’ll log it later.”',
  },
  {
    title: 'Current every time it’s opened.',
    body: 'When an agent opens your product, it already reflects their last conversation, not their last free hour.',
  },
  {
    title: 'Part of every call.',
    body: 'Your platform participates in every conversation an agent has, without asking them to remember a thing.',
  },
] as const;

const PARTNERSHIP_CARDS = [
  {
    title: 'Reamo works inside your product.',
    body: 'Reamo acts on your users’ behalf, updating records, syncing data, and triggering workflows in your platform the moment a call ends. Your product stays the system of record. Reamo keeps it current.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="rgba(27,58,107,0.65)" strokeWidth="1.5" />
        <polyline
          points="8,11 11,14 16,8"
          stroke="rgba(27,58,107,0.65)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="8" y1="21" x2="16" y2="21" stroke="rgba(27,58,107,0.65)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Co-marketing, built in.',
    body: 'Partners get featured placement across Reamo’s site and product, plus co-marketing with our team at launch. Your platform in front of agents as they standardize their post-call workflow.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 10V14L14 18V6L4 10Z"
          stroke="rgba(27,58,107,0.65)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M17 9C18.2 9.7 19 10.8 19 12C19 13.2 18.2 14.3 17 15"
          stroke="rgba(27,58,107,0.65)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'A clean technical lift.',
    body: 'Integrations are API- and webhook-based, built around your existing platform. And your data stays yours. We don’t sell, license, or share it. Ever.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <polyline
          points="8,7 3,12 8,17"
          stroke="rgba(27,58,107,0.65)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="16,7 21,12 16,17"
          stroke="rgba(27,58,107,0.65)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="13" y1="5" x2="11" y2="19" stroke="rgba(27,58,107,0.65)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

export default function PartnersPage() {
  return (
    <main className="w-full min-w-0 bg-white text-[var(--ink)]" data-nav-surface="light">
      {/* Hero */}
      <section className="px-page pb-[var(--section-pad-y)] pt-20 text-center" data-no-reveal data-nav-surface="light">
        <div className="mx-auto max-w-[760px]">
          <SectionRevealItem>
            <p className="section-eyebrow mb-6 text-brand-blue-light">Integration partners</p>
            <h1 className="section-headline mb-5 text-black">
              Be there when
              <br />
              the call ends.
            </h1>
          </SectionRevealItem>
          <SectionRevealItem>
            <p className={`${DESCRIPTOR_CLASS} mx-auto max-w-[640px]`}>
              Reamo is the middle office for real estate agents: when a call ends, Reamo files the
              notes, updates the records, and schedules the follow-ups, all inside the tools
              agents already use. We partner with the platforms that make up the agent&apos;s stack.
            </p>
          </SectionRevealItem>
          <SectionRevealItem>
            <Link
              href="#apply"
              className="mt-10 inline-block rounded-full bg-black px-[30px] py-[13px] text-[15px] text-white no-underline transition-opacity hover:opacity-88"
            >
              Apply to partner
            </Link>
          </SectionRevealItem>
        </div>
      </section>

      {/* Section A: current integrations */}
      <section className="section-y bg-[var(--bg)] px-page text-center" data-no-reveal data-nav-surface="light">
        <div className="mx-auto max-w-[1100px]">
          <SectionRevealItem>
            <p className="section-eyebrow mb-6 text-brand-blue-light">Live today</p>
            <h2 className="section-headline mb-4 text-black">
              Already inside
              <br />
              the daily stack.
            </h2>
          </SectionRevealItem>
          <SectionRevealItem className="mb-12">
            <p className={`${DESCRIPTOR_CLASS} mx-auto max-w-[560px]`}>
              Reamo runs inside the tools agents use every day, reading what matters and
              doing the work in each of them.
            </p>
          </SectionRevealItem>
          <SectionRevealItem>
            <ul className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-3" aria-label="Current Reamo integrations">
              {CURRENT_INTEGRATIONS.map((integration) => (
                <li
                  key={integration.name}
                  className="flex items-baseline gap-2.5 rounded-full border border-black/10 bg-white px-5 py-3"
                >
                  <span className="font-montserrat text-[15px] font-semibold leading-none text-black">
                    {integration.name}
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans),sans-serif] text-xs leading-none text-black/40">
                    {integration.category}
                  </span>
                </li>
              ))}
            </ul>
          </SectionRevealItem>
        </div>
      </section>

      {/* Section B: why partner */}
      <section className="section-y bg-white px-page" data-no-reveal data-nav-surface="light">
        <div className="mx-auto max-w-[1100px]">
          <SectionRevealItem>
            <p className="section-eyebrow mb-6 text-brand-blue-light">Why partner</p>
            <h2 className="section-headline mb-4 text-black">
              The post-call workflow
              <br />
              is consolidating.
            </h2>
          </SectionRevealItem>
          <SectionRevealItem className="mb-12">
            <p className={`${DESCRIPTOR_CLASS} max-w-[680px]`}>
              Every client call ends the same way: notes to file, records to update, follow-ups to
              schedule, documents to move. Agents in Reamo&apos;s invite-only beta don&apos;t do
              that work by hand anymore. They hang up, and Reamo executes across their
              stack.
            </p>
          </SectionRevealItem>

          <SectionRevealItem className="mb-12">
            <p className={`${SUBHEADER_CLASS} mb-8`}>
              For the platforms Reamo connects to, that looks like this:
            </p>
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {WORKFLOW_POINTS.map((point) => (
                <div key={point.title}>
                  <div className="mb-4 h-0.5 w-8 bg-brand-blue-light" />
                  <h3 className={`mb-2.5 ${SUBHEADER_CLASS}`}>{point.title}</h3>
                  <p className="m-0 text-[15px] font-light leading-[1.6] text-black/60">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionRevealItem>

          <SectionRevealItem className="mb-12">
            <p className={`${DESCRIPTOR_CLASS} max-w-[680px]`}>
              None of this is hypothetical. Reamo is live inside Follow Up Boss, Lofty, and Dotloop
              today, connected to the phone systems agents actually carry, and shaped by an
              advisory board of real estate industry leaders and by the beta agents who run it on
              real business every day.
            </p>
          </SectionRevealItem>

          <SectionRevealItem>
            <p className={`${DESCRIPTOR_CLASS} max-w-[680px]`}>
              We&apos;re now formalizing how each category of agent software (CRM,
              transaction management, VoIP, calendar, communications) connects to post-call
              execution. The earliest partners in each category get featured placement: the
              integration agents see first when they connect their stack.{' '}
              <span className="whitespace-nowrap font-bold text-black">Every category will have a first mover.</span>
            </p>
          </SectionRevealItem>
        </div>
      </section>

      {/* Section C: what integration means */}
      <section className="section-y bg-[var(--bg)] px-page" data-no-reveal data-nav-surface="light">
        <div className="mx-auto max-w-[1100px]">
          <SectionRevealItem>
            <p className="section-eyebrow mb-6 text-brand-blue-light">The partnership</p>
            <h2 className="section-headline mb-12 text-black">
              What integration
              <br />
              actually means.
            </h2>
          </SectionRevealItem>
          {/* [TODO: Josh to confirm] any additional technical or commercial specifics (SLAs,
              revenue share, partner docs) before adding them here. Nothing beyond the
              existing site copy is claimed below. */}
          <SectionRevealItem>
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {PARTNERSHIP_CARDS.map((card) => (
                <div key={card.title}>
                  <div className="mb-[18px]">{card.icon}</div>
                  <h3 className={`mb-2.5 ${SUBHEADER_CLASS}`}>{card.title}</h3>
                  <p className="m-0 text-[15px] font-light leading-[1.6] text-black/60">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </SectionRevealItem>
        </div>
      </section>

      {/* Section D: application form */}
      <section id="apply" className="section-y bg-white px-page" data-no-reveal data-nav-surface="light">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center">
          <div className="mb-10 max-w-lg text-center">
            <p className="section-eyebrow mb-6 text-brand-blue-light">Apply</p>
            <h2 className="section-headline mb-5 text-black">Become a partner.</h2>
            <p className={`${DESCRIPTOR_CLASS} mx-auto`}>
              Tell us about your platform and what you&apos;d want the integration to do. Our team
              reviews every application.
            </p>
          </div>

          <PartnerApplicationForm />
        </div>
      </section>
    </main>
  );
}
