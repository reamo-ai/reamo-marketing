'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { type ReactNode } from 'react';

type SectionRevealItemProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionRevealItem({
  children,
  className = '',
}: SectionRevealItemProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
    revealOnMount: false,
  });

  return (
    <div ref={ref} className={`section-reveal-item ${className}`.trim()}>
      {children}
    </div>
  );
}
