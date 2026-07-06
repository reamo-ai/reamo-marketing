'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const cards = [
  'Notes',
  'CRM',
  'Transactions',
  'Calendar',
  'Follow up tasks',
];

function getCardScrollLeft(carousel: HTMLDivElement, card: HTMLElement, index: number) {
  if (index === 0) return 0;
  return card.offsetLeft + card.offsetWidth / 2 - carousel.clientWidth / 2;
}

function getActiveCardIndex(carousel: HTMLDivElement) {
  const cardEls = carousel.querySelectorAll('.carousel-card');
  let closest = 0;
  let minDist = Infinity;

  cardEls.forEach((card, i) => {
    const el = card as HTMLElement;
    const targetScroll = getCardScrollLeft(carousel, el, i);
    const dist = Math.abs(targetScroll - carousel.scrollLeft);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });

  return closest;
}

export default function StoryCarousel({
  headlineRef,
}: {
  headlineRef?: React.RefObject<HTMLParagraphElement>;
} = {}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.querySelectorAll('.carousel-card')[index] as HTMLElement | undefined;
    if (!card) return;

    carousel.scrollTo({ left: getCardScrollLeft(carousel, card, index), behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // scroll-snap can offset past the leading inset on load — reset to true start
    carousel.scrollLeft = 0;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    function onMouseDown(e: MouseEvent) {
      isDown = true;
      carousel!.classList.add('grabbing');
      startX = e.pageX - carousel!.offsetLeft;
      scrollLeft = carousel!.scrollLeft;
    }

    function onMouseLeave() {
      isDown = false;
      carousel!.classList.remove('grabbing');
    }

    function onMouseUp() {
      isDown = false;
      carousel!.classList.remove('grabbing');
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel!.offsetLeft;
      carousel!.scrollLeft = scrollLeft - (x - startX) * 1.2;
    }

    function onScroll() {
      setActiveIndex(getActiveCardIndex(carousel!));
    }

    carousel.addEventListener('mousedown', onMouseDown);
    carousel.addEventListener('mouseleave', onMouseLeave);
    carousel.addEventListener('mouseup', onMouseUp);
    carousel.addEventListener('mousemove', onMouseMove);
    carousel.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      carousel.removeEventListener('mousedown', onMouseDown);
      carousel.removeEventListener('mouseleave', onMouseLeave);
      carousel.removeEventListener('mouseup', onMouseUp);
      carousel.removeEventListener('mousemove', onMouseMove);
      carousel.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="story" className="relative z-[2] bg-black pb-16 pt-24 max-md:pt-16">
      <p
        ref={headlineRef}
        className="section-headline mb-10 px-page text-left text-white max-md:mb-8"
      >
        You handle the client.
        <br />
        Reamo handles everything else.
      </p>
      <div ref={carouselRef} className="carousel-track-wrap" id="carousel">
        <div className="carousel-track-inner">
          {cards.map((label) => (
            <div key={label} className="carousel-card">
              <p className="font-montserrat text-[clamp(18px,2vw,24px)] font-extrabold leading-[1.15] tracking-[-0.03em] text-white">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-2.5" role="tablist" aria-label="Story slides">
        {cards.map((label, index) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-label={`Go to: ${label}`}
            aria-selected={index === activeIndex}
            onClick={() => scrollToCard(index)}
            className={`h-2 w-2 shrink-0 rounded-full border-0 p-0 transition-colors duration-200 ${
              index === activeIndex ? 'bg-white' : 'bg-[#a1a1a6] hover:bg-[#d1d1d6]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
