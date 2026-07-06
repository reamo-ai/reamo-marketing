const MISSION_BODY_CLASS =
  'font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(17px,1.65vw,20px)] font-normal leading-[1.6] text-neutral-300';

export default function MissionStatementSection() {
  return (
    <section className="section-y relative w-full px-page text-left">
      <div className="mx-auto w-full min-w-0 max-w-[1200px] pl-6 md:pl-10">
        <div className="max-w-2xl">
          <p className="section-headline text-white">
            Why did we build this?
          </p>

          <p className={`${MISSION_BODY_CLASS} mt-6`}>
            AI is overcomplicated. Isn&apos;t it supposed to make things easier?
          </p>

          <p className={`${MISSION_BODY_CLASS} mt-4`}>
            We asked a simple question: what are agents actually great at?
          </p>

          <p className={`${MISSION_BODY_CLASS} mt-4`}>
            The answer was obvious. People. Trust. The kind of relationship you can&apos;t automate, and
            shouldn&apos;t try to.
          </p>

          <p className={`${MISSION_BODY_CLASS} mt-4`}>
            So we made a rule: AI should never stand between an agent and a human being. Its only job is
            to clear everything else out of the way — so the agent can get back to the one thing that
            actually closes deals.
          </p>

          <p className={`${MISSION_BODY_CLASS} mt-8 text-neutral-200`}>
            That&apos;s the whole idea. That&apos;s Reamo.
          </p>

          <p className={`${MISSION_BODY_CLASS} mt-4 text-neutral-200`}>
            Built with agents, for agents.
          </p>
        </div>
      </div>
    </section>
  );
}
