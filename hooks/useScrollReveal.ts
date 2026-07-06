'use client';

import { useEffect, useRef } from 'react';

type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  /** When false, skip eager mount checks — reveal only once scrolled into view. */
  revealOnMount?: boolean;
};

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions | number = {},
) {
  const {
    threshold = 0.08,
    rootMargin = '0px',
    revealOnMount = true,
  } = typeof options === 'number' ? { threshold: options } : options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;

    const reveal = () => {
      if (done) return;
      done = true;
      el.classList.add('visible');
    };

    const isInView = () => {
      const { top, bottom, height } = el.getBoundingClientRect();
      if (height <= 0) return false;

      const visibleHeight = Math.min(bottom, window.innerHeight) - Math.max(top, 0);
      return visibleHeight / height >= threshold;
    };

    const sync = () => {
      if (isInView()) reveal();
    };

    if (!('IntersectionObserver' in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal();
        }
      },
      { threshold: [0, 0.01, threshold], rootMargin },
    );

    observer.observe(el);

    if (revealOnMount) {
      sync();
      requestAnimationFrame(sync);
    }

    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [threshold, rootMargin, revealOnMount]);

  return ref;
}
