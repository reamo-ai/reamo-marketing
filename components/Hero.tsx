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
        <div className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto overscroll-y-auto md:overflow-visible">
          <div className="pointer-events-auto mx-auto w-full min-w-0 max-w-7xl px-[var(--page-gutter)]">
            <p className="mb-4 text-[10px] font-medium uppercase leading-snug tracking-wide text-accent sm:mb-6 sm:text-xs sm:tracking-widest">
              The Real Estate Agent Middle Office
            </p>

            <div className="grid min-w-0 items-start gap-6 md:grid-cols-[minmax(0,1fr)_1.35fr] md:gap-8 lg:gap-12">
              {/* Left: headline + copy */}
              <div className="min-w-0 text-left">
                <h1 className="text-[calc(1.75rem+5px)] font-bold leading-tight tracking-tight text-primary md:text-[clamp(1.75rem,5vw,3.75rem)]">
                  <span className="block whitespace-nowrap">Hours of admin</span>
                  <span className="block whitespace-nowrap">handled by</span>
                  <span className="block whitespace-nowrap">
                    every call<span className="text-accent">.</span>
                  </span>
                </h1>

                <div className="mt-4 max-w-sm space-y-3 text-xs leading-snug text-secondary sm:mt-6 sm:max-w-md sm:space-y-4 sm:text-sm sm:leading-relaxed">
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
              <div className="relative order-2 w-full overflow-hidden rounded-2xl border border-accent md:order-none md:col-start-2 md:row-start-1 md:self-start">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={HERO_VIDEO_SRC}
                  className="block h-auto w-full"
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
