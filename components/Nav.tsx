'use client';

import Link from 'next/link';
import { useNavSurface } from '@/hooks/useNavSurface';

function NavGlassShine({ inverted }: { inverted: boolean }) {
  if (inverted) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/80 to-transparent" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      <div className="absolute -left-1/4 -top-1/2 h-[120%] w-3/4 rotate-12 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/15 to-transparent" />
    </div>
  );
}

export default function Nav() {
  const onLightSurface = useNavSurface();

  return (
    <header className="fixed inset-x-0 top-0 z-[200] pointer-events-none px-4 pt-[var(--nav-float-top)] sm:px-5">
      <div
        className={`pointer-events-auto relative mx-auto flex h-[var(--nav-pill-height)] w-full max-w-[1240px] items-center justify-between gap-3 overflow-hidden rounded-full px-4 sm:px-5 ${
          onLightSurface ? 'nav-glass-on-light' : 'nav-glass'
        }`}
      >
        <NavGlassShine inverted={onLightSurface} />
        <Link href="/" className="relative z-[1] flex h-full items-center no-underline">
          <span
            className={`font-montserrat text-[19px] font-extrabold leading-none tracking-[0.005em] ${
              onLightSurface ? 'text-near-black' : 'text-white nav-text-on-dark-shadow'
            }`}
          >
            Reamo
          </span>
        </Link>

        <div className="relative z-[1] flex h-full items-center gap-2 sm:gap-3">
          <a
            href="https://app.reamo.ai"
            className={`inline-flex items-center rounded-full border px-3.5 py-2 text-xs leading-none no-underline transition-colors duration-300 ${
              onLightSurface
                ? 'border-brand-blue text-brand-blue hover:border-brand-blue/70 hover:text-brand-blue/70'
                : 'border-white/20 text-white hover:border-white/40 hover:text-white'
            }`}
          >
            Login
          </a>
          <Link
            href="/request-access"
            className={
              onLightSurface
                ? 'inline-flex items-center rounded-full bg-near-black px-3.5 py-2 text-xs leading-none text-white no-underline transition-opacity hover:opacity-85'
                : 'inline-flex items-center rounded-full bg-white px-3.5 py-2 text-xs leading-none text-black no-underline transition-opacity hover:opacity-85'
            }
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
