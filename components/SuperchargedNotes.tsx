import SuperchargedNotesCircles from '@/components/SuperchargedNotesCircles';

const CARD_LABEL_CLASS =
  'font-montserrat text-[clamp(16px,2vw,22px)] font-medium leading-snug text-white';

const CARD_GRADIENT_CLASS =
  'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-6 pb-4 pt-20 max-md:px-4 max-md:pb-3 max-md:pt-14';

const BENTO_ITEMS = [
  { label: 'Notes.', type: 'feature' as const },
  { label: 'Action items.', type: 'compact' as const },
  { label: 'Financials.', type: 'compact' as const },
  { label: 'Life events.', type: 'feature' as const },
];

function CardBottomLabel({ label }: { label: string }) {
  return (
    <div className={CARD_GRADIENT_CLASS}>
      <p className={CARD_LABEL_CLASS}>{label}</p>
    </div>
  );
}

function FeatureCard({ label }: { label: string }) {
  return (
    <div className="relative min-h-0 flex-[1.35] overflow-hidden rounded-3xl bg-[#141414] max-md:rounded-2xl">
      <CardBottomLabel label={label} />
    </div>
  );
}

function CompactCard({ label }: { label: string }) {
  return (
    <div className="relative flex min-h-0 flex-[0.85] items-center gap-4 overflow-hidden rounded-3xl bg-[#141414] max-md:rounded-2xl">
      <CardBottomLabel label={label} />
    </div>
  );
}

function BentoGrid() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[800px] flex-1 gap-3 lg:gap-4">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 lg:gap-4">
        <FeatureCard label={BENTO_ITEMS[0].label} />
        <CompactCard label={BENTO_ITEMS[1].label} />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 lg:gap-4">
        <CompactCard label={BENTO_ITEMS[2].label} />
        <FeatureCard label={BENTO_ITEMS[3].label} />
      </div>
    </div>
  );
}

type SuperchargedNotesProps = {
  variant?: 'bento' | 'circles';
  circleItems?: string[];
  itemShape?: 'circle' | 'rounded-square' | 'square';
  itemScale?: 'default' | 'large';
  headlineLines?: readonly string[];
  eyebrow?: string;
  eyebrowClassName?: string;
  headlineEyebrow?: string;
  headlineEyebrowClassName?: string;
  compactTop?: boolean;
  tightTop?: boolean;
  eyebrowOutsideBox?: boolean;
  outsideEyebrow?: string;
  outsideEyebrowClassName?: string;
  eyebrowSubtext?: string;
  eyebrowSubtextClassName?: string;
  introOnly?: boolean;
  embedded?: boolean;
  alignHeadlineToCircle?: boolean;
  circleItemImages?: Record<string, string>;
  circleItemContents?: Record<string, string>;
};

export default function SuperchargedNotes({
  variant = 'bento',
  circleItems,
  itemShape,
  itemScale,
  headlineLines,
  eyebrow,
  eyebrowClassName,
  headlineEyebrow,
  headlineEyebrowClassName,
  compactTop = false,
  tightTop = false,
  eyebrowOutsideBox = false,
  outsideEyebrow,
  outsideEyebrowClassName,
  eyebrowSubtext,
  eyebrowSubtextClassName,
  introOnly = false,
  embedded = false,
  alignHeadlineToCircle = false,
  circleItemImages,
  circleItemContents,
}: SuperchargedNotesProps) {
  const circlesSectionClass = embedded
    ? ''
    : compactTop
      ? tightTop
        ? 'px-page pb-2 pt-[var(--section-follow-offset-top)] max-md:pb-1 max-md:pt-[var(--section-follow-offset-top)]'
        : 'px-page pb-2 pt-4 max-md:pb-1 max-md:pt-3'
      : 'px-page pb-2 pt-8 max-md:pb-1 max-md:pt-6 lg:pt-10';

  const circlesBoxClass = embedded
    ? 'w-full min-w-0 overflow-hidden rounded-3xl bg-near-black px-0'
    : 'mx-auto w-full min-w-0 max-w-[1200px] overflow-hidden rounded-3xl bg-near-black px-0';

  const circlesPaginationClass = 'pt-3 pb-1 max-md:pt-2';

  return (
    <section
      className={
        variant === 'circles'
          ? `relative z-[2] box-border w-full min-w-0 overflow-x-hidden ${embedded ? 'bg-transparent' : 'bg-section-gutter'} ${circlesSectionClass}`
          : 'relative z-[2] box-border flex h-[calc(100svh-var(--nav-height))] w-full min-w-0 flex-col overflow-x-hidden bg-black px-page pb-2 pt-8 max-md:pb-1 max-md:pt-6 lg:pt-10'
      }
    >
      {variant === 'bento' ? (
        <h2 className="section-headline mx-auto w-full max-w-[1200px] shrink-0 px-8 text-left text-white max-lg:px-4 max-md:px-2">
          Nothing missed.
          <br />
          Nothing forgotten.
        </h2>
      ) : null}

      {variant === 'bento' ? (
        <div className="mx-auto mt-3 flex min-h-0 w-full max-w-[1200px] flex-1 flex-col rounded-3xl bg-near-black px-12 pt-6 pb-10 max-lg:mt-2 max-lg:px-8 max-lg:pt-5 max-lg:pb-8 max-md:px-6 max-md:pt-4 max-md:pb-7">
          <BentoGrid />
        </div>
      ) : (
        <SuperchargedNotesCircles
          items={circleItems}
          itemShape={itemShape}
          itemScale={itemScale}
          headlineLines={headlineLines}
          eyebrow={eyebrow}
          eyebrowClassName={eyebrowClassName}
          headlineEyebrow={headlineEyebrow}
          headlineEyebrowClassName={headlineEyebrowClassName}
          compactPadding={compactTop}
          splitPagination
          eyebrowOutsideBox={eyebrowOutsideBox}
          outsideEyebrow={outsideEyebrow}
          outsideEyebrowClassName={outsideEyebrowClassName}
          eyebrowSubtext={eyebrowSubtext}
          eyebrowSubtextClassName={eyebrowSubtextClassName}
          introOnly={introOnly}
          embedded={embedded}
          alignHeadlineToCircle={alignHeadlineToCircle}
          itemImages={circleItemImages}
          itemContents={circleItemContents}
          boxClassName={circlesBoxClass}
          paginationClassName={circlesPaginationClass}
        />
      )}
    </section>
  );
}
