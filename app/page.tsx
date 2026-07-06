import PhoneCallEndsSection from '@/components/PhoneCallEndsSection';
import SuperchargedNotes from '@/components/SuperchargedNotes';
import WorksHowYouWorkSection from '@/components/WorksHowYouWorkSection';
import DashboardSection from '@/components/DashboardSection';
import Integrations, {
  INTEGRATIONS_PILL_HALF_OFFSET,
  INTEGRATIONS_PILL_HALF_PAD,
} from '@/components/Integrations';
import PrivacySection from '@/components/PrivacySection';
import QuoteSection from '@/components/QuoteSection';
import CtaApply from '@/components/CtaApply';

const SHOW_BLOCKS = false;
const SHOW_INTEGRATIONS = false;

export default function Home() {
  return (
    <main className="w-full min-w-0 bg-near-black text-white">
      <div className="bg-hero-near-black">
        <section className="relative w-full bg-hero-near-black" data-no-reveal>
          <div className="home-hero-viewport flex w-full items-center justify-center" data-nav-surface="dark">
            <div className="w-full px-page">
              <div className="mx-auto w-full min-w-0 max-w-[1200px]">
                <PhoneCallEndsSection />
              </div>
            </div>
          </div>
        </section>
      </div>
      {SHOW_INTEGRATIONS ? <Integrations /> : null}
      <div
        className={`bg-white${SHOW_INTEGRATIONS ? ` ${INTEGRATIONS_PILL_HALF_OFFSET} ${INTEGRATIONS_PILL_HALF_PAD}` : ''}`}
      >
        <WorksHowYouWorkSection showIntegrationsGap={SHOW_INTEGRATIONS} />
      </div>
      <div className="relative w-full min-w-0">
        <div className="bg-[var(--hero-bg)]">
          <div className="px-page">
            {SHOW_BLOCKS ? (
              <div className="mx-auto w-full min-w-0 max-w-[1200px]">
                <SuperchargedNotes embedded />
              </div>
            ) : null}
          </div>
        </div>
        <div className="bg-hero-near-black">
          <div className="px-page">
            <div className="mx-auto w-full min-w-0 max-w-[1200px]">
              <DashboardSection />
            </div>
          </div>
        </div>
        <QuoteSection />
      </div>
      <PrivacySection />
      <CtaApply />
    </main>
  );
}
