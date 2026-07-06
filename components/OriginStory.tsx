export default function OriginStory() {
  return (
    <section className="relative z-10 bg-[var(--color-background)] px-page py-16 sm:py-24 lg:py-32">
      {/* Top divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
        }}
      />

      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-2xl">
        {/* Section label */}
        <p className="mb-7 text-center text-xs font-medium uppercase tracking-widest text-accent">
          Why we built Reamo
        </p>

        {/* H2 */}
        <h2 className="section-headline mb-8 text-center text-primary">
          From Bespoke to Breakthrough
        </h2>

        {/* Body */}
        <p className="text-sm leading-[1.55] text-secondary sm:text-base">
          Reamo was built by{' '}
          <a
            href="https://beranguard.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 transition-colors hover:underline"
          >
            Beranguard
          </a>
          , an AI venture studio. After 15 years in the trenches with
          world-class brokers, high-performing agents, and the tech giants that
          power them, we noticed a recurring problem: most automation feels
          &ldquo;robotic&rdquo; and misses the mark on the nuance of a real estate deal.
          In 2025, we began building bespoke AI agents for elite teams. The
          results were incredible, but the demand was overwhelming. We realized
          that every agent—not just those with custom dev budgets—deserved an AI
          that actually speaks the language of the industry. We shifted from
          one-off builds to create Reamo: a platform that delivers the power of
          a high-touch, tailored AI assistant but connects to your existing
          phone system in just a few clicks. We built Reamo because you
          shouldn&apos;t have to choose between advanced technology and a personal
          touch.
        </p>
      </div>
    </section>
  );
}
