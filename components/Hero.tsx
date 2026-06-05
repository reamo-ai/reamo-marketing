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
        <div className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto overscroll-y-auto lg:justify-center lg:overflow-visible">
          <div className="pointer-events-auto mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:my-auto lg:px-12">
            <div className="grid min-w-0 items-center gap-4 sm:gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
              {/* Left: copy */}
              <div className="min-w-0 text-left">
                <p className="mb-4 inline-flex max-w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[10px] font-medium uppercase leading-snug tracking-wide text-accent sm:mb-6 sm:py-1.5 sm:text-xs sm:tracking-widest">
                  The Real Estate Agent Middle Office
                </p>

                <h1 className="w-full max-w-xl text-[2rem] font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
                  Admin handled<br />
                  while you talk<span className="text-accent">.</span>
                </h1>

                <div className="mt-4 max-w-xl space-y-3 text-xs leading-snug text-secondary sm:mt-6 sm:space-y-4 sm:text-sm sm:leading-relaxed">
                  <p>
                    Built for real estate agents who want to focus on clients —<br className="hidden sm:block" />
                    not admin.
                  </p>
                  <p>
                    Reamo is the only tool that turns your phone calls into real estate-specific notes, creates loops in Dotloop, manages your Google Calendar, flags client life events, and builds real-time CRM sheets — automatically while you talk.
                  </p>
                </div>

                <div className="mt-8 hidden sm:mt-10 lg:block">
                  <a
                    href="#pricing"
                    className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-[#0a0a0f] transition-opacity hover:opacity-90 sm:inline-flex sm:w-auto"
                  >
                    Get Started
                  </a>
                </div>
              </div>

              {/* Header video — above CTA on mobile; right column on desktop */}
              <div className="relative order-2 min-w-0 w-full max-w-full overflow-hidden rounded-2xl border border-accent bg-[var(--color-surface)] lg:order-none lg:col-start-2 lg:row-start-1">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={HERO_VIDEO_SRC}
                  className="block h-auto max-h-[32vh] w-full object-contain sm:max-h-none"
                  aria-label="Product demo video"
                />
              </div>

              <div className="order-3 mt-2 lg:hidden">
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
