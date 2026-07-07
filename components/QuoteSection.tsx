import SectionRevealItem from '@/components/SectionRevealItem';
import Image from 'next/image';

export default function QuoteSection() {
  return (
    <section className="section-y relative z-[2] bg-white px-page text-center" data-no-reveal data-nav-surface="light">
      <SectionRevealItem className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-full lg:mb-9 lg:h-28 lg:w-28">
        <Image
          src="/images/quotes/pam-socha.png"
          alt="Pam Socha"
          width={886}
          height={886}
          className="h-full w-full object-cover object-center"
        />
      </SectionRevealItem>
      <SectionRevealItem>
        <blockquote className="mx-auto mb-9 max-w-[960px] font-montserrat text-[clamp(17px,4.2vw,19px)] font-medium leading-[1.3] tracking-[-0.02em] text-brand-blue lg:text-[22px]">
          &ldquo;Reamo is like having a personal assistant with me all the time.
          I don&apos;t worry about forgetting anymore. I just talk, and Reamo catches every
          detail and puts it exactly where it needs to go. My Dotloop, CRM, notes, calendar,
          all of it, so I can stay focused on my clients. I knew I would save hours with Reamo,
          but I didn&apos;t expect how freeing that would actually feel. It&apos;s a new
          reality.&rdquo;
        </blockquote>
      </SectionRevealItem>
      <SectionRevealItem>
        <div className="mx-auto mb-4 h-0.5 w-8 bg-brand-blue-light" />
        <div className="section-eyebrow text-brand-blue-light">
          <p className="m-0 font-normal">
            Pam Socha, Realtor
            <sup className="text-[0.55em] leading-none">&copy;</sup>
          </p>
          <p className="m-0 font-normal">RealTrends Agent</p>
          <p className="m-0 font-normal">
            <span className="font-bold">$60M+</span> individual sales
          </p>
        </div>
      </SectionRevealItem>
    </section>
  );
}
