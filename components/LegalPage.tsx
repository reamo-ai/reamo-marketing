import { ReactNode } from 'react';

interface LegalPageProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

export default function LegalPage({ title, effectiveDate, children }: LegalPageProps) {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-primary">Effective Date: {effectiveDate}</p>
          <div
            className="mt-6 h-px w-full"
            style={{
              background: 'linear-gradient(to right, rgba(0,212,160,0.4), transparent)',
            }}
          />
        </div>
        <div className="legal-body space-y-8 text-primary [&_a]:text-accent [&_a:hover]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold uppercase tracking-wide text-primary">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function LegalSubSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="space-y-2 pl-0">
      <h3 className="text-sm font-semibold text-primary">{heading}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed">{children}</p>;
}
