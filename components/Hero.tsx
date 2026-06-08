import { heroVideoSrc } from '@/lib/media-sources';

const HERO_VIDEO_SRC = heroVideoSrc;

export default function Hero() {
  return (
    <>
      {/* Background — static, no scroll animation */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow absolute inset-x-0 top-0 h-[520px]" />
      </div>

      {/* Locked hero overlay — content below scrolls over it */}
      <section className="pointer-events-none fixed inset-0 z-0 flex flex-col overflow-hidden pb-6 pt-[var(--hero-offset-top)]">
        <div className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto overscroll-y-auto md:justify-center md:overflow-visible">
          <div className="pointer-events-auto mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 md:my-auto lg:px-12">
            <p className="mb-4 text-[10px] font-medium uppercase leading-snug tracking-wide text-accent sm:mb-6 sm:text-xs sm:tracking-widest">
              The Real Estate Agent Middle Office
            </p>

            <div className="grid min-w-0 items-start gap-4 md:grid-cols-[1fr_1.3fr] md:gap-10 lg:gap-12">
              {/* Left: headline + copy */}
              <div className="min-w-0 text-left">
                <h1 className="w-full max-w-xl text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
                  Admin handled<br />
                  while you talk<span className="text-accent">.</span>
                </h1>

                <div className="mt-4 max-w-xl space-y-3 text-xs leading-snug text-secondary sm:mt-6 sm:space-y-4 sm:text-sm sm:leading-relaxed">
                  <p>
                    Built for real estate agents who want to focus on clients — not admin.
                  </p>
                  <p>
                    Reamo is the only tool that turns your phone calls into real estate-specific notes, creates loops in Dotloop, manages your Google Calendar, flags client life events, and builds real-time CRM sheets automatically while you talk.
                  </p>
                </div>

                <div className="mt-8 hidden md:mt-10 md:block">
                  <a
                    href="#pricing"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-[#0a0a0f] transition-opacity hover:opacity-90"
                  >
                    Get Started
                  </a>
                </div>
              </div>

              {/* Header video — top-aligned with headline from tablet up */}
              <div className="relative order-2 w-fit max-w-full justify-self-start overflow-hidden rounded-2xl border border-accent md:order-none md:col-start-2 md:row-start-1 md:w-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={HERO_VIDEO_SRC}
                  className="block h-auto w-auto max-w-full max-h-[32vh] md:w-full md:max-h-none"
                  aria-label="Product demo video"
                />
              </div>

              <div className="order-3 mt-2 w-full md:hidden">
                <a
                  href="#pricing"
                  className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-[#0a0a0f] transition-opacity hover:opacity-90"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
