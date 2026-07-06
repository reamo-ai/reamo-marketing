'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_CIRCLE_ITEMS = [
  'Summaries',
  'Life Events',
  'Financials',
  'Next Steps',
];

const SCROLL_EDGE_SPACER = 'max(1rem, calc(50% - clamp(81px, 9.9vw, 117px)))';

const SCROLL_EDGE_SPACER_LARGE =
  'max(1rem, calc(50% - clamp(93px, 11.4vw, 135px)))';

const ITEM_SIZING = {
  default: {
    circleVars:
      '[--circle:clamp(162px,19.8vw,234px)] max-md:[--circle:clamp(144px,25.2vw,198px)]',
    scrollSpacer: SCROLL_EDGE_SPACER,
    gap: 'gap-12 max-md:gap-8 lg:gap-16',
  },
  large: {
    circleVars:
      '[--circle:clamp(186px,22.8vw,269px)] max-md:[--circle:clamp(166px,29vw,228px)]',
    scrollSpacer: SCROLL_EDGE_SPACER_LARGE,
    gap: 'gap-14 max-md:gap-10 lg:gap-[4.5rem]',
  },
} as const;

const CIRCLE_LABEL_CLASS =
  'mt-5 text-center font-montserrat text-[clamp(12px,1.3vw,15px)] font-medium leading-snug text-white max-md:mt-4';

const CIRCLE_ITEM_DESCRIPTIONS: Record<string, string> = {
  Summaries:
    'Post-call summaries and running client notes, written automatically and trained on specialized real estate terminology - not generalized.',
  'Life Events':
    'Job changes, milestones, and moving timelines flagged for follow-up. Nothing said on a call is ever lost or forgotten.',
  Financials:
    'Every number that matters. Offers, commissions, earnest money, closing costs — pulled from the conversation and recorded automatically.',
  'Next Steps':
    'Never forget to follow up on anything again. Every task you need to do after each call is added to a checklist.',
  CRM:
    'Client notes pushed to Follow Up Boss and Lofty after every call — no manual entry, ever. Using a different CRM? Export your data anytime.',
  Transactions:
    "When a client's ready to move forward, Reamo creates a Dotloop loop or Lofty transaction and populates every detail automatically, so your docs are ready in seconds.",
  Calendar:
    "Appointments created, updated, rescheduled, and cancelled automatically, pulled straight from the conversation. Reamo handles your calendar so you don't have to touch it.",
};

const PREVIEW_PAD = 'calc(var(--circle) * 0.05)';

function CircleItemPreview({
  content,
  isFocused = false,
}: {
  content: string;
  isFocused?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { title, body } = useMemo(() => {
    const splitIndex = content.indexOf('\n\n');
    if (splitIndex === -1) {
      return { title: content, body: '' };
    }
    return {
      title: content.slice(0, splitIndex),
      body: content.slice(splitIndex + 2),
    };
  }, [content]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const fitText = () => {
      const style = getComputedStyle(wrap);
      const padY =
        Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
      const padX =
        Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight);
      const availableHeight = wrap.clientHeight - padY;
      const availableWidth = wrap.clientWidth - padX;

      let lo = 2.5;
      let hi = availableWidth * 0.1;

      while (hi - lo > 0.05) {
        const mid = (lo + hi) / 2;
        text.style.fontSize = `${mid}px`;
        if (text.scrollHeight > availableHeight) {
          hi = mid;
        } else {
          lo = mid;
        }
      }

      text.style.fontSize = `${lo}px`;
    };

    fitText();
    requestAnimationFrame(fitText);
    const observer = new ResizeObserver(fitText);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [title, body, isFocused]);

  return (
    <div
      ref={wrapRef}
      className="box-border flex size-full items-center overflow-hidden"
      style={{ padding: PREVIEW_PAD }}
    >
      <div
        ref={textRef}
        className="w-full text-left font-sans leading-[1.1] tracking-[-0.01em] text-white"
      >
        <p className="font-semibold">{title}</p>
        {body ? <p className="mt-[0.35em] font-normal">{body}</p> : null}
      </div>
    </div>
  );
}

const CIRCLE_DESCRIPTION_CLASS =
  'mt-2 max-w-[clamp(180px,22vw,260px)] text-center font-montserrat text-[clamp(10.5px,1.1vw,13px)] font-normal leading-snug text-neutral-400';

const DEFAULT_EYEBROW_LINES = [
  "There's a problem",
  'with AI notetakers...',
  'they only take notes.',
] as const;

const DEFAULT_EYEBROW = DEFAULT_EYEBROW_LINES.join(' ');

const DEFAULT_HEADLINE_LINES = ['Nothing missed.', 'Nothing forgotten.'] as const;

const HEADLINE_TYPE_CLASS =
  'section-headline text-left';

const HEADLINE_CLASS =
  'section-headline text-left text-white';

type SuperchargedNotesCirclesProps = {
  items?: string[];
  itemShape?: 'circle' | 'rounded-square' | 'square';
  itemScale?: keyof typeof ITEM_SIZING;
  headlineLines?: readonly string[];
  eyebrow?: string;
  eyebrowClassName?: string;
  headlineEyebrow?: string;
  headlineEyebrowClassName?: string;
  compactPadding?: boolean;
  splitPagination?: boolean;
  eyebrowOutsideBox?: boolean;
  outsideEyebrow?: string;
  outsideEyebrowClassName?: string;
  eyebrowSubtext?: string;
  eyebrowSubtextClassName?: string;
  introOnly?: boolean;
  embedded?: boolean;
  alignHeadlineToCircle?: boolean;
  itemImages?: Record<string, string>;
  itemContents?: Record<string, string>;
  boxClassName?: string;
  paginationClassName?: string;
};

export default function SuperchargedNotesCircles({
  items = DEFAULT_CIRCLE_ITEMS,
  itemShape = 'circle',
  itemScale = 'default',
  headlineLines = DEFAULT_HEADLINE_LINES,
  eyebrow = DEFAULT_EYEBROW,
  eyebrowClassName = 'text-brand-blue-light',
  headlineEyebrow,
  headlineEyebrowClassName = 'text-[17px] text-brand-blue-light',
  compactPadding = false,
  splitPagination = false,
  eyebrowOutsideBox = false,
  outsideEyebrow,
  outsideEyebrowClassName = 'text-[17px] font-bold text-[#7AAD8C]',
  eyebrowSubtext,
  eyebrowSubtextClassName = 'text-neutral-400',
  introOnly = false,
  embedded = false,
  alignHeadlineToCircle = false,
  itemImages,
  itemContents,
  boxClassName = '',
  paginationClassName = '',
}: SuperchargedNotesCirclesProps) {
  const sizing = ITEM_SIZING[itemScale];
  const scrollRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [headlineVisible, setHeadlineVisible] = useState(true);
  const isSettling = useRef(false);
  const focusedIndexRef = useRef(0);
  const pendingIndexRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  const getScrollPositionForIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return 0;

    const item = itemRefs.current[index];
    if (!item) return 0;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const itemCenter =
      container.scrollLeft + (itemRect.left - containerRect.left) + itemRect.width / 2;
    const scrollLeft = itemCenter - container.clientWidth / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    return Math.min(Math.max(0, scrollLeft), maxScroll);
  }, []);

  const getNearestIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return 0;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let nearest = 0;
    let minDist = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const dist = Math.abs(containerCenter - itemCenter);
      if (dist < minDist) {
        minDist = dist;
        nearest = index;
      }
    });

    return nearest;
  }, []);

  const clearSettleTimer = useCallback(() => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const updateHeadlineVisibility = useCallback(() => {
    const container = scrollRef.current;
    const headline = headlineRef.current;
    if (!container || !headline) return;

    const containerLeft = container.getBoundingClientRect().left;
    const headlineRight = headline.getBoundingClientRect().right;
    setHeadlineVisible(headlineRight > containerLeft + 4);
  }, []);

  const syncScrollState = useCallback(() => {
    updateHeadlineVisibility();

    if (isSettling.current && pendingIndexRef.current !== null) {
      focusedIndexRef.current = pendingIndexRef.current;
      setFocusedIndex(pendingIndexRef.current);
      return;
    }

    const nearest = getNearestIndex();
    focusedIndexRef.current = nearest;
    setFocusedIndex(nearest);
  }, [getNearestIndex, updateHeadlineVisibility]);

  const finishSettling = useCallback(() => {
    clearSettleTimer();
    isSettling.current = false;
    pendingIndexRef.current = null;
    updateHeadlineVisibility();
    const nearest = getNearestIndex();
    focusedIndexRef.current = nearest;
    setFocusedIndex(nearest);
  }, [clearSettleTimer, getNearestIndex, updateHeadlineVisibility]);

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const container = scrollRef.current;
      if (!container) return;

      const clamped = Math.max(0, Math.min(items.length - 1, index));

      clearSettleTimer();
      pendingIndexRef.current = clamped;
      focusedIndexRef.current = clamped;
      setFocusedIndex(clamped);

      const target = getScrollPositionForIndex(clamped);
      isSettling.current = smooth;
      container.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'auto' });

      if (!smooth) {
        pendingIndexRef.current = null;
        isSettling.current = false;
        updateHeadlineVisibility();
        return;
      }

      settleTimerRef.current = window.setTimeout(finishSettling, 450);
    },
    [
      clearSettleTimer,
      finishSettling,
      getScrollPositionForIndex,
      items.length,
      updateHeadlineVisibility,
    ]
  );

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    clearSettleTimer();
    pendingIndexRef.current = null;
    isSettling.current = true;
    focusedIndexRef.current = 0;
    setFocusedIndex(0);
    container.scrollLeft = 0;

    requestAnimationFrame(() => {
      updateHeadlineVisibility();
      isSettling.current = false;
    });
  }, [clearSettleTimer, updateHeadlineVisibility]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onResize = () => {
      scrollToIndex(focusedIndexRef.current, false);
    };

    const onScrollEnd = () => {
      finishSettling();
    };

    container.addEventListener('scroll', syncScrollState, { passive: true });
    container.addEventListener('scrollend', onScrollEnd);
    window.addEventListener('resize', onResize);

    return () => {
      clearSettleTimer();
      container.removeEventListener('scroll', syncScrollState);
      container.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('resize', onResize);
    };
  }, [clearSettleTimer, finishSettling, scrollToIndex, syncScrollState]);

  const scrollPaddingClass = compactPadding
    ? 'pt-[calc(var(--circle)*0.26)] pb-[calc(var(--circle)*0.335)] max-md:pt-[calc(var(--circle)*0.22)] max-md:pb-[calc(var(--circle)*0.297)]'
    : 'pt-[calc(var(--circle)*0.28)] pb-[calc(var(--circle)*0.355)] max-md:pt-[calc(var(--circle)*0.24)] max-md:pb-[calc(var(--circle)*0.315)]';

  const hasHeadlineTopEyebrow =
    !splitPagination || !eyebrowOutsideBox || Boolean(headlineEyebrow);

  const headlineEyebrowTopClass = 'mt-[calc(var(--circle)*0.075+10px)]';

  const headlineBlockInsetClass = 'pl-10 max-lg:pl-8 max-md:pl-6 lg:pl-14';

  const headlineBlockClass = alignHeadlineToCircle
    ? `snap-start flex h-[calc(var(--circle)*1.075)] w-[min(400px,calc(50%-6rem))] shrink-0 flex-col pt-[calc(var(--circle)*0.075)] ${headlineBlockInsetClass} transition-opacity duration-200 max-md:w-[min(280px,calc(50%-4rem))]`
    : `snap-start flex min-h-[calc(var(--circle)*1.15)] w-[min(400px,calc(50%-6rem))] shrink-0 flex-col ${hasHeadlineTopEyebrow ? 'justify-between' : 'justify-end'} ${headlineBlockInsetClass} transition-opacity duration-200 max-md:w-[min(280px,calc(50%-4rem))]`;

  const inlineEyebrowClass = alignHeadlineToCircle
    ? 'section-eyebrow shrink-0'
    : `section-eyebrow ${headlineEyebrowTopClass}`;

  const carousel = (
    <div className={`mx-auto flex w-full min-w-0 flex-col overflow-hidden ${sizing.circleVars}`}>
      <div className="flex min-w-0 items-center overflow-hidden">
        <div
          ref={scrollRef}
          className={`flex min-w-0 w-full snap-x snap-proximity scroll-smooth items-start overflow-x-auto overflow-y-visible overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${scrollPaddingClass} ${sizing.gap}`}
        >
        <div
          ref={headlineRef}
          className={`${headlineBlockClass} ${
            focusedIndex === 0 && headlineVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {alignHeadlineToCircle ? (
            <div className="flex h-[var(--circle)] flex-col justify-between">
              {!splitPagination || !eyebrowOutsideBox ? (
                <p className={`${inlineEyebrowClass} ${eyebrowClassName}`}>{eyebrow}</p>
              ) : headlineEyebrow ? (
                <p className={`${inlineEyebrowClass} ${headlineEyebrowClassName}`}>
                  {headlineEyebrow}
                </p>
              ) : null}
              <h2 className={HEADLINE_CLASS}>
                {headlineLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h2>
            </div>
          ) : (
            <>
              {!splitPagination || !eyebrowOutsideBox ? (
                <p className={`${inlineEyebrowClass} ${eyebrowClassName}`}>{eyebrow}</p>
              ) : headlineEyebrow ? (
                <p className={`${inlineEyebrowClass} ${headlineEyebrowClassName}`}>
                  {headlineEyebrow}
                </p>
              ) : null}
              <h2 className={HEADLINE_CLASS}>
                {headlineLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h2>
            </>
          )}
        </div>

        {items.map((label, index) => {
          const isFocused = focusedIndex === index;
          const imageSrc = itemImages?.[label];
          const itemContent = itemContents?.[label];

          return (
            <button
              key={label}
              type="button"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              aria-label={label}
              aria-current={isFocused ? 'true' : undefined}
              onClick={() => scrollToIndex(index)}
              className={`flex shrink-0 cursor-pointer flex-col items-center border-0 bg-transparent p-0 pt-[calc(var(--circle)*0.075)] text-left ${index > 0 ? 'snap-center' : ''}`}
            >
              <div className="flex size-[calc(var(--circle)*1.15)] shrink-0 items-center justify-center">
                <div
                  className={`relative origin-center overflow-hidden bg-[#141414] will-change-[transform,width,height] ${
                    itemContent ? 'border border-white' : ''
                  } ${
                    itemShape === 'circle'
                      ? 'rounded-full'
                      : itemShape === 'square'
                        ? 'rounded-lg'
                        : 'rounded-3xl'
                  } ${
                    itemContent
                      ? `${isFocused ? 'size-[calc(var(--circle)*1.15)]' : 'size-[var(--circle)]'} transition-[width,height] duration-300 ease-out`
                      : `size-[var(--circle)] transition-transform duration-300 ease-out ${isFocused ? 'scale-[1.15]' : 'scale-100'}`
                  }`}
                >
                  {itemContent ? (
                    <CircleItemPreview content={itemContent} isFocused={isFocused} />
                  ) : imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageSrc}
                      alt=""
                      className="size-full object-contain"
                    />
                  ) : null}
                  {!itemContent && !imageSrc ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  ) : null}
                </div>
              </div>
              <p
                className={`${CIRCLE_LABEL_CLASS} max-w-[clamp(180px,22vw,260px)] transition-[transform,opacity] duration-300 ease-out ${
                  isFocused
                    ? 'translate-y-[calc(var(--circle)*0.075)] opacity-100'
                    : 'translate-y-0 opacity-55'
                }`}
              >
                {label}
              </p>
              {CIRCLE_ITEM_DESCRIPTIONS[label] ? (
                <p
                  className={`${CIRCLE_DESCRIPTION_CLASS} transition-[transform,opacity] duration-300 ease-out ${
                    isFocused
                      ? 'translate-y-[calc(var(--circle)*0.075)] opacity-100'
                      : 'translate-y-0 opacity-55'
                  }`}
                >
                  {CIRCLE_ITEM_DESCRIPTIONS[label]}
                </p>
              ) : null}
            </button>
          );
        })}

        <div aria-hidden className="shrink-0" style={{ width: sizing.scrollSpacer }} />
        </div>
      </div>
    </div>
  );

  const pagination = (
    <div
      className={`flex shrink-0 justify-center gap-2 ${splitPagination ? paginationClassName : 'pb-3 pt-1 max-md:pb-2'}`}
      role="tablist"
      aria-label="Carousel items"
    >
      {items.map((label, index) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={focusedIndex === index}
          aria-label={label}
          onClick={() => scrollToIndex(index)}
          className={`size-1.5 rounded-full transition-colors duration-300 ${
            focusedIndex === index ? 'bg-brand-blue' : 'bg-zinc-600'
          }`}
        />
      ))}
    </div>
  );

  if (splitPagination) {
    return (
      <>
        {eyebrowOutsideBox ? (
          <div
            className={
              embedded ? 'w-full min-w-0' : 'mx-auto mb-10 w-full min-w-0 max-w-[1200px]'
            }
          >
            {outsideEyebrow ? (
              <p className={`section-eyebrow mb-3 ${outsideEyebrowClassName}`}>
                {outsideEyebrow}
              </p>
            ) : null}
            <p className={`${HEADLINE_TYPE_CLASS} text-left ${eyebrowClassName}`}>
              {DEFAULT_EYEBROW_LINES.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
            {eyebrowSubtext ? (
              <p className={`mt-4 max-w-2xl whitespace-pre-line text-left font-[family-name:var(--font-dm-sans),sans-serif] text-[clamp(14px,1.5vw,17px)] font-normal leading-[1.55] ${eyebrowSubtextClassName}`}>
                {eyebrowSubtext}
              </p>
            ) : null}
          </div>
        ) : null}
        {!introOnly ? <div className={boxClassName}>{carousel}</div> : null}
        {!introOnly ? pagination : null}
      </>
    );
  }

  return (
    <>
      {carousel}
      {pagination}
    </>
  );
}
