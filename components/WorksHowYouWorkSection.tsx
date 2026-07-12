'use client';

import { Fragment } from 'react';
import { INTEGRATIONS_PILL_GAP_PAD } from '@/components/Integrations';
import SectionRevealItem from '@/components/SectionRevealItem';
import StoryPhoneGraphic from '@/components/story/StoryPhoneGraphic';
import Image from 'next/image';

const DESCRIPTOR_CLASS =
  'm-0 font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(17.4px,1.5vw,20.4px)] font-medium leading-[1.3] text-neutral-600';

const SLIDE_LABEL_CLASS =
  'm-0 font-[family-name:var(--font-dm-sans),sans-serif] [font-size:var(--paragraph-header-size)] font-bold leading-snug text-black';

const MEDIA_BOX_WIDTH_CLASS = 'mx-auto w-full lg:w-[92%]';

const MEDIA_BOX_CLASS =
  `relative ${MEDIA_BOX_WIDTH_CLASS} h-auto overflow-hidden rounded-2xl bg-[#1c1c1e] px-[max(0px,calc((100%-28.5rem)/2))] pt-0 max-md:px-[max(0px,calc((100%-22rem)/2))] lg:h-[481px] lg:bg-[var(--bg)] lg:pt-[38px]`;

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

const CALL_MESSAGES = [
  {
    role: 'user' as const,
    text: "What's the status on J.B. Fletch?",
  },
  {
    role: 'reamo' as const,
    text: "J.B. is active and moving. She's under contract on 412 Birchwood Lane — Dotloop loop is created. I updated her status in Follow Up Boss and noted that she had her baby. You've got a call with her lender tomorrow at 2pm to confirm the inspection timeline. Inspection is currently scheduled for Thursday morning.",
  },
];

function MobileMessageList({ messages }: { messages: readonly { role: 'user' | 'reamo'; text: string }[] }) {
  return (
    <div className="flex w-full flex-col justify-start gap-2 p-5">
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          className={`max-w-[82%] whitespace-pre-line rounded-xl px-3 py-2 font-sans text-[14px] leading-snug ${
            message.role === 'user' ? 'self-end bg-[#007AFF] text-white' : 'self-start bg-[#3b3b3d] text-white'
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}

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
      "Reamo remembers everything so you don't have to. Text any time with questions about your clients and calls. Reamo responds right away.",
  },
] as const;

const FEATURE_SQUARE_TEXT_WIDTH_CLASS = 'w-full max-w-[247px] sm:max-w-[266px] md:max-w-[304px]';

const FEATURE_SQUARE_TEXT_CLASS =
  `m-0 ${FEATURE_SQUARE_TEXT_WIDTH_CLASS} text-center font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(14.7px,1.5vw,17.7px)] font-medium leading-[1.3] text-neutral-600`;

const FEATURE_SQUARE_TEXT_TITLE_CLASS =
  'mb-1 block [font-size:var(--paragraph-header-size)] font-bold text-black';

const FEATURE_SQUARES = [
  {
    id: 'feature-1',
    title: 'Connect Reamo',
    text: 'Tell Reamo which calls to listen to on your iPhone or Android. Or connect QUO or RingCentral and Reamo handles everything by itself.',
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
  'relative mx-auto flex h-[204px] w-full max-w-[222px] items-center justify-center overflow-hidden rounded-2xl bg-white px-6 sm:h-[221px] sm:max-w-[239px] sm:px-8 md:h-[251px] md:max-w-[274px]';

const FEATURE_GRID_CLASS =
  'mx-auto grid w-full max-w-[1000px] grid-cols-1 justify-items-center gap-12 lg:w-auto lg:max-w-none lg:grid-cols-[repeat(3,max-content)] lg:justify-center lg:gap-8';

const SLIDES_GRID_CLASS = 'grid w-full grid-cols-1 gap-5 max-md:gap-8 md:grid-cols-2 md:gap-5';

export default function WorksHowYouWorkSection({
  showIntegrationsGap = true,
}: {
  showIntegrationsGap?: boolean;
}) {
  return (
    <section
      className={`relative flex min-h-[calc(100svh-var(--nav-height))] w-full min-w-0 flex-col justify-start bg-gradient-to-b from-[var(--bg)] to-white pt-[var(--section-pad-y)]${showIntegrationsGap ? ` ${INTEGRATIONS_PILL_GAP_PAD}` : ''}`}
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
                      className={`object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.22)]${'imageClassName' in square ? ` ${square.imageClassName}` : ''}`}
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
        className="w-full bg-white px-page py-[var(--section-pad-y)]"
        data-nav-surface="light"
      >
        <div className="mx-auto w-full min-w-0 max-w-[1200px]">
          <SectionRevealItem className="text-left max-lg:text-center">
            <p className="section-eyebrow mb-3 text-brand-blue-light">Use the device you already use</p>
            <h2 className="section-headline text-black">
              Always a text away.
            </h2>
          </SectionRevealItem>
          <SectionRevealItem className="text-left max-lg:text-center">
            <p className={`${DESCRIPTOR_CLASS} mt-4 max-w-2xl max-lg:mx-auto`}>
              Like a human assistant, Reamo is a contact in your phone.
              <br />
              Unlike a human assistant, Reamo is available 24/7.
            </p>
          </SectionRevealItem>
          <SectionRevealItem className="mt-10 w-full max-md:mt-8">
            <div className={SLIDES_GRID_CLASS}>
              {SLIDES.map((slide, index) => {
                const colStartClass = index === 0 ? 'md:col-start-1' : 'md:col-start-2';
                return (
                  <Fragment key={slide.id}>
                    <div className={`${MEDIA_BOX_CLASS} md:row-start-1 ${colStartClass}`}>
                      <div className="h-full w-full lg:hidden">
                        <MobileMessageList messages={slide.id === 'text' ? UPDATE_MESSAGES : CALL_MESSAGES} />
                      </div>
                      <div className="relative top-[-40px] mx-auto hidden w-full max-w-full origin-bottom scale-[0.9975] max-lg:scale-[0.945] max-md:scale-[0.924] lg:top-[-22px] lg:block lg:w-[410px] lg:max-w-[410px]">
                        <StoryPhoneGraphic
                          messages={slide.id === 'text' ? UPDATE_MESSAGES : CALL_MESSAGES}
                        />
                      </div>
                    </div>
                    <div
                      className={`mt-1 flex ${MEDIA_BOX_WIDTH_CLASS} flex-col gap-1 md:mt-1 md:row-start-2 ${colStartClass}`}
                    >
                      <p className={SLIDE_LABEL_CLASS}>{slide.label}</p>
                      <p className={DESCRIPTOR_CLASS}>{slide.description}</p>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </SectionRevealItem>
        </div>
      </div>
    </section>
  );
}
