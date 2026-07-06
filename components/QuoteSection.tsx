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
        <blockquote className="mx-auto mb-9 max-w-[760px] font-montserrat text-[clamp(11.5px,3vw,37px)] font-medium leading-[0.98] tracking-[-0.04em] text-brand-blue lg:text-[50px]">
          &ldquo;I used to spend two hours after every call on admin. Now I&apos;m on the next
          call.&rdquo;
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
