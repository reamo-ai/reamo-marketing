import { Fragment, type ReactNode } from 'react';

const stats: {
  id: string;
  value: string;
  body: ReactNode;
}[] = [
  {
    id: 'hours',
    value: '13 hrs',
    body: 'The average agent loses 13 hours every week to admin that generates zero revenue.',
  },
  {
    id: 'revenue',
    value: '26%',
    body: 'Only 26% of an agent\u2019s work hours go toward actual revenue — showings, negotiations, and the relationships that close deals.',
  },
  {
    id: 'closings',
    value: '10+',
    body: 'The number of additional closings an agent could close in a year by putting that time back into their business.',
  },
];

const horizontalLine =
  'linear-gradient(to right, transparent, rgba(0,212,160,0.2), transparent)';
const verticalLine =
  'linear-gradient(to bottom, transparent, rgba(0,212,160,0.2), transparent)';

function StatDivider() {
  return (
    <>
      <div
        aria-hidden
        className="my-10 h-px w-full max-w-xs justify-self-center sm:max-w-sm lg:hidden"
        style={{ background: horizontalLine }}
      />
      <div
        aria-hidden
        className="hidden w-px shrink-0 self-stretch lg:block"
        style={{ background: verticalLine, minHeight: '12rem' }}
      />
    </>
  );
}

export default function Stats() {
  return (
    <section className="relative z-10 bg-[var(--color-background)] px-10 py-16 sm:px-16 lg:px-24 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{ background: horizontalLine }}
      />

      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 max-w-2xl text-left text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
          <span className="whitespace-nowrap">Numbers</span>
          <br />
          <span className="whitespace-nowrap">
            Don&apos;t Lie<span className="text-accent">.</span>
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {stats.map((stat, index) => (
            <Fragment key={stat.id}>
              {index > 0 && <StatDivider />}
              <div
                className={`flex min-w-0 flex-1 flex-col gap-3 ${
                  index === 0 ? 'lg:pr-10' : index === stats.length - 1 ? 'lg:pl-10' : 'lg:px-10'
                }`}
              >
                <p
                  className="text-5xl font-bold leading-none tracking-tight text-accent lg:text-6xl"
                  style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm leading-relaxed text-primary">{stat.body}</p>
              </div>
            </Fragment>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] italic leading-relaxed text-[var(--text-muted)] lg:mt-10">
          Source: National Association of REALTORS® 2025 Member Profile
        </p>
      </div>
    </section>
  );
}
