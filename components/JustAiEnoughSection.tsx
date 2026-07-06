const SUBHEADER_CLASS =
  'max-w-2xl font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(14px,1.5vw,17px)] font-normal leading-[1.55] text-neutral-400 max-lg:mx-auto';

export default function JustAiEnoughSection() {
  return (
    <section className="relative w-full py-16 max-md:py-12 md:py-20">
      <div className="text-left max-lg:text-center">
        <p className="section-eyebrow mb-3 text-brand-blue-light">NO NONESENSE</p>
        <h2 className="section-headline text-white">
          Powerful enough
          <br />
          to make a difference.
          <br />
          Simple enough to use.
        </h2>
        <p className={`${SUBHEADER_CLASS} mt-4`}>
          Reamo is not another notetaker.
          <br />
          No new app. No onboarding. No unnecessary AI.
          <br />
          Connect your stack in seconds, and get back to closing.
        </p>
      </div>
    </section>
  );
}
