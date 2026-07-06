'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

const REVEAL_SELECTOR = 'section, footer, .section-y, [data-reveal]';
const SKIP_SELECTOR = '[data-no-reveal], nav, [role="navigation"]';

function isInView(el: Element) {
  const { top, bottom } = el.getBoundingClientRect();
  return top < window.innerHeight && bottom > 0;
}

function shouldSkip(el: Element) {
  if (el.matches(SKIP_SELECTOR)) return true;
  if (el.closest(SKIP_SELECTOR)) return true;
  if (el.querySelector('.reveal, .reveal-up')) return true;

  const ancestor = el.parentElement?.closest(REVEAL_SELECTOR);
  return Boolean(ancestor && ancestor !== el);
}

function revealIfInView(el: Element) {
  if (!el.classList.contains('reveal-global')) return;
  if (el.classList.contains('visible')) return;
  if (isInView(el)) el.classList.add('visible');
}

export default function GlobalScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: [0, 0.01, 0.08] },
    );

    const register = (el: Element) => {
      if (el.hasAttribute('data-global-reveal') || shouldSkip(el)) return;

      el.setAttribute('data-global-reveal', '');
      el.classList.add('reveal-global');

      if (isInView(el)) {
        el.classList.add('visible');
        return;
      }

      observer.observe(el);
    };

    const sync = () => {
      document
        .querySelectorAll(`${REVEAL_SELECTOR}[data-global-reveal]`)
        .forEach(revealIfInView);
    };

    const scan = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach(register);
      sync();
    };

    scan();
    requestAnimationFrame(scan);

    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });

    const failsafe = window.setTimeout(() => {
      document.querySelectorAll('.reveal-global:not(.visible)').forEach((el) => {
        el.classList.add('visible');
      });
    }, 2500);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
