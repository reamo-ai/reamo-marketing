'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const HEADLINE_CLASS = 'section-headline text-left';

const CHECKLIST_BOX_CLASS =
  'flex w-full items-center justify-center rounded-3xl bg-hero-near-black px-10 py-14 max-[899px]:px-5 max-[899px]:py-8 lg:px-[100px] lg:py-28';

const CHECKLIST_HEADLINE_CLASS = [
  HEADLINE_CLASS,
  'text-white min-w-0 max-w-full',
  'min-[900px]:whitespace-nowrap',
  'max-[899px]:w-full',
  /* True phones: keep the tuned single-line fluid treatment. */
  'max-[639px]:whitespace-nowrap',
  'max-[639px]:[font-size:clamp(calc((23px+5pt)*1.2733875),calc((6vw+5pt)*1.2733875),calc((74px+5pt)*1.2733875))]',
  /* Narrow desktop/tablet windows (640-899px): the 6vw-scaled phone formula
     grows past what fits on one line at these widths. Let it wrap instead
     of overflowing, with a size that's capped independent of viewport width. */
  'min-[640px]:max-[899px]:whitespace-normal',
  'min-[640px]:max-[899px]:[font-size:clamp(23px,5vw,52px)]',
].join(' ');

const CHECKLIST_BODY_CLASS =
  'mt-4 flex w-full max-w-2xl min-w-0 flex-col gap-4 font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(20.4px,3.8vw,23.4px)] font-medium leading-[1.55] text-neutral-400 max-[899px]:mt-3 max-[899px]:gap-3';

export default function HeroChecklistSection() {
  const revealRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
    revealOnMount: false,
  });

  return (
    <div className="relative w-full bg-white px-page" data-nav-surface="light">
      <div className="mx-auto w-full min-w-0 max-w-[1200px] py-[var(--page-gutter-mobile)] md:py-[var(--page-gutter)]">
        <div ref={revealRef} className={`hero-box-reveal ${CHECKLIST_BOX_CLASS}`}>
          <div className="hero-checklist-content w-full">
            <div className="relative mx-auto flex w-full max-w-full min-w-0 flex-col items-start gap-8">
              <p className="section-eyebrow mb-3 text-[14px] text-brand-blue-light min-[900px]:whitespace-nowrap">
                <span className="max-[899px]:block min-[900px]:inline">Ridiculously simple.</span>{' '}
                <span className="max-[899px]:block min-[900px]:inline">Insanely powerful.</span>
              </p>
              <div className="flex flex-col items-start">
                <p className={CHECKLIST_HEADLINE_CLASS}>The call ends.</p>
                <p className={`${CHECKLIST_HEADLINE_CLASS} max-[899px]:mt-1 min-[900px]:-mt-1`}>
                  Reamo begins.
                </p>
              </div>
              <div className={CHECKLIST_BODY_CLASS}>
                <p className="m-0">
                  Reamo is the AI you were hoping for - an autonomous agent that listens, thinks,
                  learns, writes, and actually does the post-call busywork that eats up most of your
                  time.
                </p>
                <p className="m-0">While everyone else is buried, you&apos;re on the next call.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
