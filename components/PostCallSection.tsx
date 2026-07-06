import ScrollReveal from '@/components/ScrollReveal';

const cards = [
  {
    ghost: '01',
    dark: false,
    title: 'Transaction created in Dotloop.',
    body: 'Every field pre-filled from your call. Property address, client names, deal terms. You just hit autofill. The loop is already there waiting.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#1B3A6B" strokeWidth="1.5" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="9" x2="21" y2="9" stroke="#1B3A6B" strokeWidth="1.5" />
        <circle cx="12" cy="15" r="2.5" fill="#1B3A6B" />
      </svg>
    ),
  },
  {
    ghost: '02',
    dark: true,
    title: 'CRM updated.',
    body: 'Budget. Timeline. Preferences. Concerns. Every detail from the call — written to your CRM the moment it ends.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
        <path
          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    ghost: '03',
    dark: false,
    title: 'Calendar managed.',
    body: 'Showings. Walkthroughs. Closing dates. Everything mentioned on the call lands on your calendar. No manual entry.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#1B3A6B" strokeWidth="1.5" />
        <line x1="3" y1="9" x2="21" y2="9" stroke="#1B3A6B" strokeWidth="1.5" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="#1B3A6B" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="7" y="13" width="4" height="4" rx="0.5" fill="#1B3A6B" />
      </svg>
    ),
  },
  {
    ghost: '04',
    dark: true,
    title: 'Follow-up task list created.',
    body: 'Not a drafted message. A clear action list — pulled from every commitment and cue in the conversation. You always know exactly what to do next.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
        <line x1="7" y1="8" x2="17" y2="8" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="12" x2="14" y2="12" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="16" x2="11" y2="16" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function PostCallSection() {
  return (
    <section id="postcall" className="relative z-[2] bg-black px-page py-[140px] max-md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal className="mb-[72px]">
          <p className="section-eyebrow mb-6 text-white/30">
            After every call
          </p>
          <h2 className="section-headline mb-5 text-white">
            Four things.
            <br />
            Automatic. Every time.
          </h2>
        </ScrollReveal>

        <div className="pc-grid">
          {cards.map((card) => (
            <ScrollReveal
              key={card.ghost}
              className={`relative overflow-hidden p-12 max-md:p-10 ${card.dark ? 'bg-[#111]' : 'bg-[#0a0a0a]'}`}
            >
              <div className="font-montserrat pointer-events-none absolute -right-2 -top-4 text-[140px] font-extrabold leading-none tracking-[-0.05em] text-white/[0.04]">
                {card.ghost}
              </div>
              <div className="mb-6">{card.icon}</div>
              <h3 className="font-montserrat mb-3 text-[clamp(20px,2vw,28px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                {card.title}
              </h3>
              <p className="max-w-[360px] text-[15px] font-light leading-[1.6] text-white/[0.38]">
                {card.body}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
