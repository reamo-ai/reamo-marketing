'use client';

import { INTEGRATIONS_PILL_GAP_PAD } from '@/components/Integrations';
import SectionRevealItem from '@/components/SectionRevealItem';
import StoryPhoneGraphic from '@/components/story/StoryPhoneGraphic';
import Image from 'next/image';

const DESCRIPTOR_CLASS =
  'm-0 font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(17.4px,1.5vw,20.4px)] font-medium leading-[1.3] text-neutral-400';

const SLIDE_LABEL_CLASS =
  'm-0 font-[family-name:var(--font-dm-sans),sans-serif] [font-size:var(--paragraph-header-size)] font-bold leading-snug text-white';

const MEDIA_BOX_WIDTH_CLASS = 'mx-auto w-[92%]';

const MEDIA_BOX_CLASS =
  `relative ${MEDIA_BOX_WIDTH_CLASS} h-[540px] overflow-hidden rounded-2xl bg-white px-[max(0px,calc((100%-28.5rem)/2))] pt-0 max-md:px-[max(0px,calc((100%-22rem)/2))] lg:h-[481px] lg:pt-[38px]`;

const MEDIA_BOX_CALL_CLASS = MEDIA_BOX_CLASS.replace('overflow-hidden', 'overflow-visible');

const UPDATE_MESSAGES = [
  {
    role: 'user' as const,
    text: `I just got this from Gordon Cole:

Hey! I got your voicemail. Yes, we're good with 3% earnest money. Thanks!`,
  },
  {
    role: 'reamo' as const,
    text: 'Got it. Want me to update dotloop and FUB?',
  },
  {
    role: 'user' as const,
    text: 'Yes.',
  },
  {
    role: 'reamo' as const,
    text: 'Done.',
  },
];

const SLIDES = [
  {
    id: 'text',
    label: 'Update',
    description:
      'Not everything is said on the phone. When it comes through in a text, just forward it to Reamo. Everything is handled and updated without missing a beat.',
  },
  {
    id: 'call',
    label: 'Follow-up',
    description:
      "Reamo remembers everything so you don't have to, and is always available. Text any time with questions about your pipeline. Reamo responds right away.",
  },
] as const;

const FEATURE_SQUARE_TEXT_WIDTH_CLASS = 'w-full max-w-[247px] sm:max-w-[266px] md:max-w-[304px]';

const FEATURE_SQUARE_TEXT_CLASS =
  `m-0 ${FEATURE_SQUARE_TEXT_WIDTH_CLASS} text-center font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(17.4px,1.5vw,20.4px)] font-medium leading-[1.3] text-neutral-400`;

const FEATURE_SQUARE_TEXT_TITLE_CLASS =
  'mb-1 block [font-size:var(--paragraph-header-size)] font-bold text-black';

const FEATURE_SQUARES = [
  {
    id: 'feature-1',
    title: 'Connect Reamo',
    text: 'Tell Reamo which calls to listen to natively on iPhone and Android. For a completely autonomous experience, connect QUO or RingCentral.',
    image: '/images/works-how-you-work/connect-phone-icons.png',
    imageAlt: 'Apple, Android, Quo, and Reamo integrations',
    imageWidth: 1492,
    imageHeight: 1292,
    imageClassName: 'max-w-none h-auto w-[209px] -mx-[17.5px] sm:w-[210px] sm:-mx-[17.5px] md:w-[252px] md:-mx-[21px]',
  },
  {
    id: 'feature-2',
    title: 'Connect Your Stack',
    text: 'Lightning fast one-click integrations to your CRM, transaction management, calendar, and more.',
    image: '/images/works-how-you-work/connect-stack-icons.png',
    imageAlt: 'Follow Up Boss, kvCORE, Sisu, Microsoft, and Google integrations',
    imageWidth: 1492,
    imageHeight: 1292,
    imageClassName: 'max-w-none h-auto w-[209px] -mx-[17.5px] sm:w-[210px] sm:-mx-[17.5px] md:w-[252px] md:-mx-[21px]',
  },
  {
    id: 'feature-3',
    title: 'Connect With Clients',
    text: 'Do what you do best, with 100% focus. Listen, talk, be in the moment. Reamo handles everything else.',
    image: '/images/works-how-you-work/connect-clients-icons.png',
    imageAlt: 'Phone, Messages, Voice Memos, and iMessage apps',
    imageWidth: 1492,
    imageHeight: 1292,
    imageClassName: 'max-w-none h-auto w-[209px] -mx-[17.5px] sm:w-[210px] sm:-mx-[17.5px] md:w-[252px] md:-mx-[21px]',
  },
] as const;

const FEATURE_BOX_CLASS =
  'relative mx-auto flex h-[204px] w-full max-w-[222px] items-center justify-center overflow-hidden rounded-2xl bg-hero-near-black px-6 sm:h-[221px] sm:max-w-[239px] sm:px-8 md:h-[251px] md:max-w-[274px]';

const FEATURE_GRID_CLASS =
  'mx-auto grid w-full max-w-[1000px] grid-cols-1 justify-items-center gap-12 lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,max-content)] lg:justify-center lg:gap-8';

const SLIDES_GRID_CLASS = 'grid w-full grid-cols-1 gap-5 max-lg:gap-8 lg:grid-cols-2 lg:gap-5';

export default function WorksHowYouWorkSection({
  showIntegrationsGap = true,
}: {
  showIntegrationsGap?: boolean;
}) {
  return (
    <section
      className={`relative flex min-h-[calc(100svh-var(--nav-height))] w-full min-w-0 flex-col justify-start pt-[var(--section-pad-y)]${showIntegrationsGap ? ` ${INTEGRATIONS_PILL_GAP_PAD}` : ''}`}
      data-no-reveal
      data-nav-surface="light"
    >
      <div className="px-page">
        <div className="mx-auto w-full min-w-0 max-w-[1200px]">
      <div className="mb-16 w-full md:mb-20">
        <SectionRevealItem className="mb-8 text-center md:mb-10">
          <p className="section-eyebrow mb-3 text-brand-blue-light">how it works</p>
          <h2 className="section-headline text-black">
            Simple. Powerful.
          </h2>
        </SectionRevealItem>
        <SectionRevealItem>
          <div className={FEATURE_GRID_CLASS}>
            {FEATURE_SQUARES.map((square, index) => (
              <div key={square.id} className="flex flex-col items-center gap-4 md:gap-3">
                <div className={FEATURE_BOX_CLASS}>
                  {'image' in square ? (
                    <Image
                      src={square.image}
                      alt={square.imageAlt}
                      width={square.imageWidth}
                      height={square.imageHeight}
                      unoptimized
                      className={`object-contain${'imageClassName' in square ? ` ${square.imageClassName}` : ''}`}
                    />
                  ) : null}
                </div>
                <p className={FEATURE_SQUARE_TEXT_CLASS}>
                  <span className={FEATURE_SQUARE_TEXT_TITLE_CLASS}>
                    {index + 1}. {square.title}
                  </span>
                  {square.text}
                </p>
              </div>
            ))}
          </div>
        </SectionRevealItem>
      </div>
        </div>
      </div>
      <div
        className="w-full bg-hero-near-black px-page py-[var(--section-pad-y)]"
        data-nav-surface="dark"
      >
        <div className="mx-auto w-full min-w-0 max-w-[1200px]">
          <SectionRevealItem className="text-left max-lg:text-center">
            <p className="section-eyebrow mb-3 text-brand-blue-light">A teammate you can rely on</p>
            <h2 className="section-headline text-white">
              Always a text away.
            </h2>
          </SectionRevealItem>
          <SectionRevealItem className="text-left max-lg:text-center">
            <p className={`${DESCRIPTOR_CLASS} mt-4 max-w-2xl max-lg:mx-auto`}>
              Like a real assistant, Reamo lives in your phone contacts.
              <br />
              Unlike a real assistant, Reamo is always available.
            </p>
          </SectionRevealItem>
          <SectionRevealItem className="mt-10 w-full max-md:mt-8">
            <div className={SLIDES_GRID_CLASS}>
              {SLIDES.map((slide) => (
                <div key={slide.id} className={MEDIA_BOX_CLASS}>
                  <div className="relative top-[-30px] mx-auto w-full max-w-full origin-bottom scale-[0.9975] max-lg:scale-[0.945] max-md:scale-[0.924] lg:top-[-12px] lg:w-[410px] lg:max-w-[410px]">
                    <StoryPhoneGraphic
                      messages={slide.id === 'text' ? UPDATE_MESSAGES : undefined}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionRevealItem>
          <SectionRevealItem className="mt-4 w-full md:mt-5">
            <div className={SLIDES_GRID_CLASS}>
              {SLIDES.map((slide) => (
                <div key={`${slide.id}-copy`} className={`flex ${MEDIA_BOX_WIDTH_CLASS} flex-col gap-1`}>
                  <p className={SLIDE_LABEL_CLASS}>{slide.label}</p>
                  <p className={DESCRIPTOR_CLASS}>{slide.description}</p>
                </div>
              ))}
            </div>
          </SectionRevealItem>
        </div>
      </div>
    </section>
  );
}
