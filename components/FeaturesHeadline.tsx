export default function FeaturesHeadline() {
  return (
    <section className="relative z-10 w-full min-w-0 bg-[var(--color-background)] px-4 pt-12 pb-6 sm:px-16 sm:pt-16 sm:pb-8 lg:px-24 lg:pt-20 lg:pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,212,160,0.2), transparent)',
        }}
      />
      <div className="mx-auto max-w-7xl">
        <h2
          id="features-headline"
          className="max-w-2xl text-left text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl"
        >
          <span className="sm:whitespace-nowrap">Reamo gives you back</span>
          <br />
          <span className="sm:whitespace-nowrap">
            70% of your time<span className="text-accent">.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
