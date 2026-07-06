import IntegrationsContent from '@/components/IntegrationsContent';

/** Half the pill height (95% padding + logo) so the black/gray split runs through the pill center. */
export const INTEGRATIONS_PILL_HALF_SPACER = 'h-[55.98px] sm:h-[66.34px] md:h-[63.43px]';
export const INTEGRATIONS_PILL_HALF_OFFSET = '-mt-[55.98px] sm:-mt-[66.34px] md:-mt-[63.43px]';
export const INTEGRATIONS_PILL_HALF_PAD = 'pt-[55.98px] sm:pt-[66.34px] md:pt-[63.43px]';

export const INTEGRATIONS_PILL_GAP = 'mt-4 max-md:mt-3 md:mt-5';
export const INTEGRATIONS_PILL_GAP_PAD = 'pt-4 max-md:pt-3 md:pt-[50px]';

export default function Integrations() {
  return (
    <>
      <div className="bg-near-black px-page">
        <div className="mx-auto w-full min-w-0 max-w-[1200px] text-center">
          <h2 className="section-headline mb-0 text-white">
            One-Click Integrations
          </h2>
          <div className={`${INTEGRATIONS_PILL_GAP} ${INTEGRATIONS_PILL_HALF_SPACER}`} aria-hidden />
        </div>
      </div>
      <div className={`relative z-20 px-page ${INTEGRATIONS_PILL_HALF_OFFSET}`}>
        <div className="mx-auto w-full min-w-0 max-w-[1200px] px-3 sm:px-5 md:px-8">
          <div
            className="mx-auto w-fit max-w-full rounded-full bg-white px-[0.8505rem] py-[1.924rem] sm:px-[1.701rem] sm:py-[2.309rem] md:px-[2.3814rem] md:py-[29.83px]"
            data-nav-surface="light"
          >
            <IntegrationsContent />
          </div>
        </div>
      </div>
    </>
  );
}
