'use client';

import { useLayoutEffect, useRef } from 'react';
import LoopCreatedVignette from './LoopCreatedVignette';

const CHECKLIST_ITEMS = [
  'Life events flagged',
  'CRM updated',
  'Loop created & filled',
  'Calendar managed',
  'Follow-up created',
  'Summary written',
] as const;

const PILL_COUNT = 6;

function CheckedItem({ label, index }: { label: string; index: number }) {
  const delay = `-${((PILL_COUNT - index) % PILL_COUNT)}s`;
  return (
    <li className="relative z-[1] list-none">
      <div className="inline-flex w-max max-w-full items-center gap-[9.23px] rounded-full bg-white px-[15.39px] py-[12.31px] text-left lg:gap-[7px] lg:px-[11px] lg:py-[8px]">
        <span
          aria-hidden
          style={{ animationDelay: delay }}
          className="checkmark-pulse flex h-[18.47px] w-[18.47px] shrink-0 items-center justify-center rounded-full bg-brand-blue-light lg:h-[14px] lg:w-[14px]"
        >
          <svg viewBox="0 0 10 10" className="h-[7.7px] w-[7.7px] lg:h-[6px] lg:w-[6px]" aria-hidden>
            <path
              d="M2 5l2.5 2.5L8 3"
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(13.85px,1.077vw,15.39px)] font-normal leading-[1.4] text-black lg:text-[13px]">
          {label}
        </span>
      </div>
    </li>
  );
}

export default function PhoneCallEndsSection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nodes = rootRef.current?.querySelectorAll<HTMLElement>('.hero-text-reveal');
    if (!nodes || nodes.length === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('visible'));
      return;
    }

    requestAnimationFrame(() => nodes.forEach((node) => node.classList.add('visible')));
  }, []);

  const topRow = CHECKLIST_ITEMS.slice(0, 3);
  const bottomRow = CHECKLIST_ITEMS.slice(3);

  return (
    <section
      ref={rootRef}
      className="relative flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center pb-10 pt-4 max-md:pb-8 max-md:pt-3 md:pb-12 md:pt-5"
    >
      <div className="hero-text-reveal hero-text-reveal--header flex w-full flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-6 xl:gap-16">
        <div className="w-full max-w-[480px] lg:max-w-none lg:min-w-0 lg:flex-[0_1_500px] lg:-translate-x-8 xl:flex-[0_1_500px] xl:-translate-x-12">
          <p className="section-eyebrow mb-10 text-center text-[16.5px] text-brand-blue-light lg:translate-y-[10px] lg:text-left">
            The real estate agent middle office
            <sup className="relative top-0 ml-0.5 inline-block -translate-y-[8px] align-baseline text-[0.4em]">TM</sup>
          </p>
          <h1 className="text-center font-[family-name:var(--font-montserrat),sans-serif] text-[clamp(28px,9vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white lg:text-left">
            The call ends.
            <br />
            Reamo gets to work.
          </h1>
          <p className="mt-4 text-center font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(14px,1.5vw,17px)] font-normal leading-[1.3] text-neutral-400 sm:mt-6 lg:text-left">
            Reamo listens to your calls, knows what needs to happen next, and does it for you - automatically.
          </p>
          <div className="hero-text-reveal mt-8 flex w-full flex-col items-center gap-2 sm:mt-10 sm:gap-[7.7px] lg:items-start lg:gap-2 xl:gap-2.5">
            <ul className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-[7.7px] lg:justify-start lg:gap-2 xl:gap-2.5">
              {topRow.map((item) => (
                <CheckedItem key={item} label={item} index={CHECKLIST_ITEMS.indexOf(item)} />
              ))}
            </ul>
            <ul className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-[7.7px] lg:justify-start lg:gap-2 xl:gap-2.5">
              {bottomRow.map((item) => (
                <CheckedItem key={item} label={item} index={CHECKLIST_ITEMS.indexOf(item)} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex w-full max-w-[560px] flex-col items-center lg:min-w-0 lg:flex-[0_1_404px] xl:flex-[0_1_540px]">
          <div className="w-full -translate-y-5">
            <LoopCreatedVignette />
          </div>
        </div>
      </div>
    </section>
  );
}
