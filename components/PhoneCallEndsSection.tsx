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

function VignetteBlock() {
  return (
    <div className="relative mx-auto flex w-full max-w-[560px] flex-col items-center lg:min-w-0">
      <div className="hero-vignette-glow absolute -inset-40" aria-hidden />
      <div className="w-full -translate-y-5 max-lg:[mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
        <LoopCreatedVignette />
      </div>
    </div>
  );
}

function CheckedItem({ label, index }: { label: string; index: number }) {
  const delay = `-${((PILL_COUNT - index) % PILL_COUNT)}s`;
  return (
    <li className="relative z-[1] list-none">
      <div className="inline-flex w-max max-w-full items-center gap-[8.73px] rounded-full border border-black/15 bg-white px-[18.32px] py-[17.3px] text-left lg:gap-[6.62px] lg:px-[14.18px] lg:py-[13.23px]">
        <span
          aria-hidden
          style={{ animationDelay: delay }}
          className="checkmark-pulse flex h-[17.45px] w-[17.45px] shrink-0 items-center justify-center rounded-full bg-brand-blue-light lg:h-[13.23px] lg:w-[13.23px]"
        >
          <svg viewBox="0 0 10 10" className="h-[7.28px] w-[7.28px] lg:h-[5.67px] lg:w-[5.67px]" aria-hidden>
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
        <span className="font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(13.09px,1.02vw,14.54px)] font-medium leading-[1.4] text-black lg:text-[12.29px]">
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
      className="relative flex h-full min-h-0 w-full min-w-0 flex-col items-center justify-start pb-10 pt-10 max-md:pb-8 max-md:pt-[52px] md:pb-12 md:pt-[68px] lg:pt-[93px]"
    >
      <div className="hero-text-reveal hero-text-reveal--header flex w-full flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-20 min-[1440px]:gap-24">
        <div className="w-full max-w-[480px] md:max-w-[680px] lg:max-w-none lg:min-w-0 lg:flex-[0_1_54%] lg:-translate-y-[10px]">
          <p className="section-eyebrow mb-[25px] text-center text-[16.5px] text-brand-blue-light lg:text-left">
            The real estate agent
            <br className="md:hidden" />
            <span className="max-md:hidden"> </span>
            middle office
            <sup className="relative top-0 ml-0.5 inline-block -translate-y-[8px] align-baseline text-[0.4em]">TM</sup>
          </p>
          <h1 className="text-center font-[family-name:var(--font-montserrat),sans-serif] text-[clamp(44px,11vw,48.7px)] font-bold leading-[1.1] tracking-[-0.02em] text-black lg:whitespace-nowrap lg:text-[clamp(30.7px,9vw,48.7px)] lg:text-left">
            The client
            <br className="md:hidden" />
            <span className="max-md:hidden"> </span>
            hangs up.
            <br />
            Reamo gets
            <br className="md:hidden" />
            <span className="max-md:hidden"> </span>
            to work.
          </h1>
          <p className="mt-[14px] px-6 text-center font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(18.4px,1.5vw,21.4px)] font-medium leading-[1.3] text-neutral-600 md:px-0 lg:text-left">
            Reamo listens to your client calls, knows what should happen next, and does it for you - automatically.
          </p>
          <p className="mt-3 px-6 text-center font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(18.4px,1.5vw,21.4px)] font-medium leading-[1.3] text-neutral-600 md:px-0 lg:mt-[16px] lg:text-left">
            No onboarding. Nothing new to learn. Connect and go.
          </p>
          <div className="mt-8 w-full lg:hidden">
            <VignetteBlock />
          </div>
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
        <div className="hidden lg:flex lg:min-w-0 lg:flex-[0_1_46%]">
          <VignetteBlock />
        </div>
      </div>
    </section>
  );
}
