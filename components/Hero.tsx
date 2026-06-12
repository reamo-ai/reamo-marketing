import StopLosingScroller from '@/components/StopLosingScroller';

export default function Hero() {
  return (
    <>
      {/* Background — static, no scroll animation */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="hero-glow absolute inset-x-0 top-0 h-[520px]" />
      </div>

      {/* Locked hero overlay — content below scrolls over it */}
      <section className="pointer-events-none fixed inset-0 z-0 flex h-[100dvh] flex-col overflow-hidden">
        <div className="pointer-events-auto flex min-h-0 flex-1 flex-col justify-start overflow-y-auto [-webkit-overflow-scrolling:touch]">
          <div className="min-h-full bg-[var(--color-background)] pb-4 pt-[var(--nav-height)] sm:pb-6">
            <StopLosingScroller />
          </div>
        </div>
      </section>
    </>
  );
}
