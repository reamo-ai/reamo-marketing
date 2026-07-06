import SectionRevealItem from '@/components/SectionRevealItem';
import Image from 'next/image';

const DESCRIPTOR_CLASS =
  'mt-4 max-w-2xl font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(14px,1.5vw,17px)] font-normal leading-[1.3] text-neutral-400 max-lg:mx-auto';

const DASHBOARD_IMAGE_CLASS =
  'block h-auto w-full rounded-2xl border border-white object-top';

const DETAIL_IMAGE_WIDTH_CLASS =
  'w-[calc((100%/1.2)*1.2*0.85*1.05*1.05*1.05)] max-w-none';

export default function DashboardSection() {
  return (
    <section id="dashboard" className="section-y relative w-full" data-no-reveal>
      <SectionRevealItem className="text-left max-lg:text-center">
        <p className="section-eyebrow mb-3 text-brand-blue-light">Transparency</p>
        <h2 className="section-headline text-white">
          Everything in one place.
          <br />
          For everyone who needs it.
        </h2>
      </SectionRevealItem>
      <SectionRevealItem className="text-left max-lg:text-center">
        <p className={DESCRIPTOR_CLASS}>
          Every client. Every transaction. Every moment.
          <br />
          Searchable, organized, and available for you, your TC, or your admin.
        </p>
      </SectionRevealItem>

      <SectionRevealItem className="relative mt-12 w-full min-w-0 overflow-x-clip lg:pb-[calc(50%*544/1024)]">
        <div className="relative w-full lg:w-[60%]">
          <div className="relative aspect-[1024/557] w-full">
            <Image
              src="/images/dashboard/overview.png"
              alt="Reamo dashboard showing recent client calls and conversation summaries"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="rounded-2xl border border-white object-cover object-top"
            />
            <Image
              src="/images/dashboard/client-detail.png"
              alt="Reamo client detail view with call notes, financials, and action items"
              width={1024}
              height={544}
              className={`${DASHBOARD_IMAGE_CLASS} absolute left-[calc(100%-245px)] top-[calc(100%-95px)] z-10 ${DETAIL_IMAGE_WIDTH_CLASS} max-lg:hidden`}
            />
          </div>
        </div>

        <div className="mt-6 leading-[0] lg:hidden">
          <Image
            src="/images/dashboard/client-detail.png"
            alt="Reamo client detail view with call notes, financials, and action items"
            width={1024}
            height={544}
            className={DASHBOARD_IMAGE_CLASS}
          />
        </div>
      </SectionRevealItem>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_60%] lg:items-start">
        <SectionRevealItem className="max-lg:text-center">
          <h3 className="section-headline text-white">
            Insights for brokers and team leaders.
          </h3>
          <p className={DESCRIPTOR_CLASS}>
            Easily assign seats, track engagement,
            <br />
            and see your ROI at a glance.
          </p>
        </SectionRevealItem>
        <SectionRevealItem className="leading-[0] lg:flex lg:justify-end">
          <Image
            src="/images/dashboard/team-dashboard.png"
            alt="Reamo Realty team dashboard showing value delivered metrics and team health"
            width={1024}
            height={557}
            className={`${DASHBOARD_IMAGE_CLASS} w-full ${DETAIL_IMAGE_WIDTH_CLASS}`}
          />
        </SectionRevealItem>
      </div>
    </section>
  );
}
