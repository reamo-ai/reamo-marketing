'use client';

import { type ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: 'reveal' | 'reveal-up';
};

export default function ScrollReveal({
  children,
  className = '',
  variant = 'reveal',
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`${variant} ${className}`.trim()}>
      {children}
    </div>
  );
}
