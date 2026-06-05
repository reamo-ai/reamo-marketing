const steps = [
  {
    id: 'connect-phone',
    number: '1.',
    title: (
      <>
        Connect Your<br />
        Business Phone<span className="text-accent">.</span>
      </>
    ),
    body: (
      <>
        Already on QUO or RingCentral? You&apos;re set.<br />
        Prefer to upload your transcripts directly? That works too.<br />
        However you connect, Reamo takes it from there.
      </>
    ),
  },
  {
    id: 'do-best',
    number: '2.',
    title: (
      <>
        Do What You Do Best<span className="text-accent">.</span>
      </>
    ),
    body: (
      <>
        Talk to clients.<br />
        Build real relationships.<br />
        Don&apos;t change a thing.
      </>
    ),
  },
  {
    id: 'reamo-rest',
    number: '3.',
    title: (
      <>
        Let Reamo Do The Rest<span className="text-accent">.</span>
      </>
    ),
    body: (
      <>
        After every call, Reamo schedules your appointments, creates and updates your loops in Dotloop, flags life events, and delivers real estate-specific notes with follow-up reminders — plus real-time CRM-ready spreadsheets you can import into any CRM, anytime.
      </>
    ),
  },
];

const stepHeadingClass =
  'text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl';

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 bg-[var(--color-background)] px-4 pt-12 pb-10 sm:px-16 sm:pt-16 sm:pb-14 lg:px-24 lg:pt-20 lg:pb-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,212,160,0.2), transparent)',
        }}
      />

      {/* Background surface band */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(20,20,30,0.8) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-3 text-left text-sm font-medium uppercase tracking-widest text-accent">
          How it works
        </p>

        <div className="space-y-5 lg:space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col gap-2 sm:flex-row sm:gap-x-3">
              <span className={`shrink-0 ${stepHeadingClass}`}>{step.number}</span>
              <div className="min-w-0 max-w-2xl flex-1">
                <h2 className={`max-w-xl ${stepHeadingClass}`}>{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
