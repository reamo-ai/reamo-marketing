import SectionRevealItem from '@/components/SectionRevealItem';
import Link from 'next/link';

export default function CtaApply() {
  return (
    <section
      id="apply"
      className="section-y relative z-[2] bg-white px-page text-center"
      data-no-reveal
      data-nav-surface="light"
    >
      <SectionRevealItem>
        <p className="section-eyebrow mb-6 text-brand-blue-light">
          Invite only
        </p>
        <h2 className="section-headline mb-5 text-black">
          The waitlist
          <br />
          is open.
        </h2>
      </SectionRevealItem>
      <SectionRevealItem>
        <p className="mx-auto mb-12 max-w-[400px] font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(19.4px,1.5vw,22.4px)] font-medium leading-[1.3] text-black/[0.34]">
          We&apos;re accepting a limited number of teams serious about what comes next.
        </p>
      </SectionRevealItem>
      <SectionRevealItem>
        <Link
          href="/waitlist"
          className="inline-block rounded-full bg-black px-[30px] py-[13px] text-[15px] text-white no-underline transition-opacity hover:opacity-88"
        >
          Join waitlist
        </Link>
      </SectionRevealItem>
    </section>
  );
}
