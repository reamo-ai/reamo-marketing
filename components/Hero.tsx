'use client';

import { useEffect, useState } from 'react';
import { heroVideoSrc } from '@/lib/media-sources';

const HERO_VIDEO_SRC = heroVideoSrc;

export default function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Start at 25% scrolled, finish by 95%
      const start = window.innerHeight * 0.25;
      const end   = window.innerHeight * 0.95;
      const p = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scale   = 1 - progress * 0.35;
  const blur    = progress * 24;
  const opacity = 1 - progress;

  return (
    <>
      {/* Background only — stays behind page content */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow absolute inset-x-0 top-0 h-[520px]" />
      </div>

      {/* Hero — fixed overlay on mobile; in-flow on desktop so the page can scroll */}
      <section
        className="pointer-events-none z-0 flex flex-col pb-6 pt-[var(--hero-offset-top)] max-lg:fixed max-lg:inset-0 lg:relative lg:min-h-[calc(100svh-var(--nav-height))] lg:pt-[var(--hero-nav-gap)]"
      >
        <div className="flex min-h-0 flex-1 flex-col max-lg:overflow-y-auto max-lg:overscroll-y-auto lg:overflow-visible">
          <div
            className="pointer-events-auto mx-auto my-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-10"
            style={{
              transform: `scale(${scale})`,
              filter: `blur(${blur}px)`,
              opacity,
              willChange: 'transform, filter, opacity',
            }}
          >
            <div className="grid min-w-0 items-center gap-6 sm:gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
              {/* Left: copy */}
              <div className="min-w-0 text-left">
                <p className="mb-6 inline-flex max-w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[10px] font-medium uppercase leading-snug tracking-wide text-accent sm:py-1.5 sm:text-xs sm:tracking-widest">
                  The Real Estate Agent Middle Office
                </p>

                <h1 className="w-full max-w-xl text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
                  Admin handled<br />
                  while you talk<span className="text-accent">.</span>
                </h1>

                <div className="mt-6 max-w-xl space-y-4 text-xs leading-relaxed text-secondary sm:text-sm">
                  <p>
                    Built for real estate agents who want to focus on clients —<br />
                    not admin.
                  </p>
                  <p>
                    Reamo is the only tool that turns your phone calls into<br />
                    real estate-specific notes, creates loops in Dotloop,<br />
                    manages your Google Calendar, flags client life events,<br />
                    and builds real-time CRM sheets —<br />
                    automatically while you talk.
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
                  className="block h-auto max-h-[50vh] w-full object-contain sm:max-h-none"
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
