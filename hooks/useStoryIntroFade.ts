function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/** 0→1 while scrolling into the phone section; reaches 1 when the sticky panel locks */
export function getPhoneApproachProgress(container: HTMLElement | null): number {
  if (!container) return 0;

  const navHeight =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
  const containerTop = container.getBoundingClientRect().top;
  const fadeStart = window.innerHeight;
  const fadeEnd = navHeight;

  if (containerTop >= fadeStart) return 0;
  if (containerTop <= fadeEnd) return 1;

  const t = 1 - (containerTop - fadeEnd) / (fadeStart - fadeEnd);
  return clamp(t, 0, 1);
}
