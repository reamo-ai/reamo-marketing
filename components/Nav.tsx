'use client';

import { useEffect, useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  return (
    <>
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

          <div className="relative z-[1] hidden h-full items-center gap-2 sm:gap-3 lg:flex">
            <Link
              href="/partners"
              className={`inline-flex items-center px-3.5 py-2 text-xs leading-none no-underline transition-colors duration-300 ${
                onLightSurface
                  ? 'text-near-black/70 hover:text-near-black'
                  : 'text-white/80 nav-text-on-dark-shadow hover:text-white'
              }`}
            >
              Integrations
            </Link>
            <a
              href="https://app.reamo.ai"
              className={`inline-flex items-center px-3.5 py-2 text-xs leading-none no-underline transition-colors duration-300 ${
                onLightSurface
                  ? 'text-near-black/70 hover:text-near-black'
                  : 'text-white/80 nav-text-on-dark-shadow hover:text-white'
              }`}
            >
              Login
            </a>
            <Link
              href="/waitlist"
              className={
                onLightSurface
                  ? 'inline-flex items-center rounded-full bg-near-black px-3.5 py-2 text-xs leading-none text-white no-underline transition-opacity hover:opacity-85'
                  : 'inline-flex items-center rounded-full bg-white px-3.5 py-2 text-xs leading-none text-black no-underline transition-opacity hover:opacity-85'
              }
            >
              Join waitlist
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="relative z-[1] flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`block h-[2px] w-5 rounded-full transition-colors ${onLightSurface ? 'bg-near-black' : 'bg-white'}`} />
            <span className={`block h-[2px] w-5 rounded-full transition-colors ${onLightSurface ? 'bg-near-black' : 'bg-white'}`} />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[300] flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 pt-[var(--nav-float-top)] sm:px-5">
            <span className="font-montserrat text-[19px] font-extrabold leading-none tracking-[0.005em] text-near-black">
              Reamo
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="relative flex h-9 w-9 items-center justify-center"
            >
              <span className="absolute block h-[2px] w-5 rotate-45 rounded-full bg-near-black" />
              <span className="absolute block h-[2px] w-5 -rotate-45 rounded-full bg-near-black" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
            <Link
              href="/partners"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full max-w-xs items-center justify-center px-6 py-2 text-base text-near-black no-underline transition-opacity hover:opacity-70"
            >
              Integrations
            </Link>
            <a
              href="https://app.reamo.ai"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full border border-brand-blue px-6 py-4 text-base text-brand-blue no-underline transition-colors hover:border-brand-blue/70 hover:text-brand-blue/70"
            >
              Login
            </a>
            <Link
              href="/waitlist"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-near-black px-6 py-4 text-base text-white no-underline transition-opacity hover:opacity-85"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
