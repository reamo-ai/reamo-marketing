'use client';

import { useEffect, useState } from 'react';

function findNavSurface(node: Element | null): 'light' | 'dark' | null {
  let current: Element | null = node;
  while (current) {
    const surface = current.getAttribute('data-nav-surface');
    if (surface === 'light' || surface === 'dark') return surface;
    current = current.parentElement;
  }
  return null;
}

function getNavSampleY() {
  const styles = getComputedStyle(document.documentElement);
  const floatTop = parseFloat(styles.getPropertyValue('--nav-float-top')) || 12;
  const pillHeight = parseFloat(styles.getPropertyValue('--nav-pill-height')) || 56;
  return floatTop + pillHeight / 2;
}

export function useNavSurface() {
  const [onLightSurface, setOnLightSurface] = useState(true);

  useEffect(() => {
    const update = () => {
      const sampleY = getNavSampleY();
      const x = Math.min(window.innerWidth - 1, Math.max(1, window.innerWidth / 2));
      const elements = document.elementsFromPoint(x, sampleY);

      for (const el of elements) {
        if (el.closest('header')) continue;
        const surface = findNavSurface(el);
        if (surface) {
          setOnLightSurface(surface === 'light');
          return;
        }
      }

      setOnLightSurface(true);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return onLightSurface;
}
