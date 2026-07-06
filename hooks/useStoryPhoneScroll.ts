'use client';

import { type RefObject, useEffect, useState } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

const TYPING_PHASE_END = 0.5;

export function useStoryPhoneScroll(sectionRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sectionRef]);

  const userT = 1;
  const showTyping = progress < TYPING_PHASE_END;
  const showReamo = progress >= TYPING_PHASE_END;

  return { progress, userT, showTyping, showReamo };
}

export function getBubbleMotionStyle(t: number) {
  const y = (1 - t) * 120;
  return {
    transform: `translateY(${y}%)`,
    opacity: t,
  } as const;
}
