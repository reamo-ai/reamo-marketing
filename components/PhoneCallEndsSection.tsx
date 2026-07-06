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
      <div className="pill-unified-gradient inline-flex w-max max-w-full items-center gap-[8.31px] rounded-full px-[17.45px] py-[16.48px] text-left lg:gap-[6.3px] lg:px-[13.5px] lg:py-[12.6px]">
        <span
          aria-hidden
          style={{ animationDelay: delay }}
          className="checkmark-pulse flex h-[16.62px] w-[16.62px] shrink-0 items-center justify-center rounded-full bg-brand-blue-light lg:h-[12.6px] lg:w-[12.6px]"
        >
          <svg viewBox="0 0 10 10" className="h-[6.93px] w-[6.93px] lg:h-[5.4px] lg:w-[5.4px]" aria-hidden>
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
        <span className="font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(12.47px,0.97vw,13.85px)] font-normal leading-[1.4] text-black lg:text-[11.7px]">
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
      className="relative flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-center pb-10 pt-10 max-md:pb-8 max-md:pt-8 md:pb-12 md:pt-12"
    >
      <div className="hero-text-reveal hero-text-reveal--header flex w-full flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-20 min-[1440px]:gap-24">
        <div className="w-full max-w-[480px] lg:max-w-none lg:min-w-0 lg:flex-[0_1_500px] lg:-translate-y-[10px] xl:flex-[0_1_500px]">
          <p className="section-eyebrow mb-[25px] text-center text-[16.5px] text-brand-blue-light lg:text-left">
            The real estate agent middle office
            <sup className="relative top-0 ml-0.5 inline-block -translate-y-[8px] align-baseline text-[0.4em]">TM</sup>
          </p>
          <h1 className="text-center font-[family-name:var(--font-montserrat),sans-serif] text-[clamp(30.7px,9vw,48.7px)] font-bold leading-[1.1] tracking-[-0.02em] text-white lg:whitespace-nowrap lg:text-left">
            The client hangs up.
            <br />
            Reamo gets to work.
          </h1>
          <p className="mt-[14px] text-center font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(19.4px,1.5vw,22.4px)] font-medium leading-[1.3] text-neutral-400 lg:text-left">
            Reamo listens to your client calls, knows what should happen next, and does it for you - automatically.
          </p>
          <div className="hero-text-reveal mt-7 flex w-full flex-col items-center gap-2 sm:gap-[7.7px] lg:mt-[38px] lg:items-start lg:gap-2 xl:gap-2.5">
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
