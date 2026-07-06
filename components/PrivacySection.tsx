import SectionRevealItem from '@/components/SectionRevealItem';

const cards = [
  {
    title: 'Your data is never sold.',
    body: "We don't sell, license, or share your client data with third parties. Ever.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3L4 7V13C4 17.4 7.4 21.5 12 22C16.6 21.5 20 17.4 20 13V7L12 3Z"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
        />
        <polyline
          points="9,12 11,14 15,10"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Encrypted in transit and at rest.',
    body: 'All call data is encrypted end-to-end. What happens on your calls stays on your calls.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
        <path
          d="M7 11V7C7 4.8 9.2 3 12 3C14.8 3 17 4.8 17 7V11"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'You own your data.',
    body: 'Export or delete at any time. Your calls, your transcripts, your records. No lock-in.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
        <polyline
          points="12,7 12,12 15,15"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Enterprise-grade infrastructure.',
    body: 'Built on enterprise-grade technologies, each with rigorous security and compliance standards.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
        <line x1="8" y1="21" x2="16" y2="21" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="21" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const DESCRIPTOR_CLASS =
  'm-0 font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(14px,1.5vw,17px)] font-normal leading-[1.55] text-neutral-400';

const SUBHEADER_CLASS =
  'font-montserrat [font-size:var(--paragraph-header-size)] font-bold leading-[1.3] text-white';

export default function PrivacySection() {
  return (
    <section id="privacy" className="section-y relative z-[2] bg-hero-near-black px-page" data-no-reveal>
      <div className="mx-auto max-w-[1100px]">
        <SectionRevealItem>
          <p className="section-eyebrow mb-6 text-white/30">
            Data &amp; privacy
          </p>
          <h2 className="section-headline mb-4 text-white">
            Built on infrastructure
            <br />
            you can trust.
          </h2>
        </SectionRevealItem>
        <SectionRevealItem className="mb-12">
          <p className={`${DESCRIPTOR_CLASS} max-w-[520px]`}>
            Your client conversations are sensitive. We treat them that way.
          </p>
        </SectionRevealItem>

        <SectionRevealItem>
          <div className="priv-cards">
            {cards.map((card) => (
              <div
                key={card.title}
                className="p-10 max-md:p-7"
              >
                <div className="mb-[18px]">{card.icon}</div>
                <h3 className={`mb-2.5 ${SUBHEADER_CLASS}`}>
                  {card.title}
                </h3>
                <p className="text-[13px] font-light leading-[1.6] text-white/[0.36]">{card.body}</p>
              </div>
            ))}
          </div>
        </SectionRevealItem>
      </div>
    </section>
  );
}
