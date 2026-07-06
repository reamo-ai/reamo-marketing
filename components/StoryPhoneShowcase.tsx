'use client';

import IntegrationsContent from '@/components/IntegrationsContent';

const BLACK_BOX_CLASS =
  'w-full rounded-3xl bg-near-black px-12 py-16 max-lg:px-8 max-lg:py-12 max-md:px-8 max-md:py-12';

const EMPTY_BLACK_BOX_CLASS = `${BLACK_BOX_CLASS} flex min-h-[calc(480px+4rem)] flex-col items-center justify-center text-center max-md:min-h-[calc(400px+4rem)]`;

type StoryPhoneShowcaseProps = {
  empty?: boolean;
};

export default function StoryPhoneShowcase({ empty = false }: StoryPhoneShowcaseProps) {
  if (empty) {
    return (
      <section className="relative z-[2] w-full min-w-0 py-16 max-md:py-12 md:py-20">
        <div className={EMPTY_BLACK_BOX_CLASS}>
          <div className="mt-3 max-md:mt-2">
            <IntegrationsContent />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-[2] w-full min-w-0 py-16 max-md:py-12 md:py-20">
      <div className={BLACK_BOX_CLASS}>
        <div className="text-left max-lg:mx-auto max-lg:max-w-[480px] max-lg:text-center lg:pl-10">
          <p className="section-eyebrow mb-3 text-[#C4B5FD]">LIKE A FRIEND YOU CAN COUNT ON</p>
          <h2 className="section-headline text-white">
            Always a text away.
          </h2>
          <p className="mt-6 max-w-[480px] text-[15px] font-normal leading-[1.55] text-white max-lg:mx-auto">
            Reamo never forgets what was said, and always knows where things stand. Text Reamo 24/7
            to get details about your pipeline, check in, and follow up.
          </p>
        </div>
      </div>
    </section>
  );
}
