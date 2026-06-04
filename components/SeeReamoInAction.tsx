import Link from 'next/link';
import { demoCardImages } from '@/lib/media-sources';

const demos = [
  {
    id: 'agent',
    href: '/agent',
    label: 'For Agents',
    body: 'See how Reamo handles hours of admin from a single call.',
    cta: 'Watch the Agent Demo',
    imageSrc: demoCardImages.agent,
  },
  {
    id: 'team',
    href: '/team',
    label: 'For Teams & Brokerages',
    body: 'See how Reamo seamlessly scales across your entire team.',
    cta: 'Watch the Team Demo',
    imageSrc: demoCardImages.team,
  },
] as const;

const topLine =
  'linear-gradient(to right, transparent, rgba(0,212,160,0.2), transparent)';

export default function SeeReamoInAction() {
  return (
    <section className="relative z-10 bg-[var(--color-background)] px-10 py-16 sm:px-16 lg:px-24 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{ background: topLine }}
      />

      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 max-w-2xl text-left text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-6xl">
          See Reamo in Action
        </h2>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              href={demo.href}
              className="group flex w-full min-w-0 flex-col items-start gap-4 transition-opacity hover:opacity-95"
            >
              <div className="relative aspect-video w-full min-w-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors group-hover:border-[var(--border-green)]">
                {demo.imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={demo.imageSrc}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/40"
                  >
                    <span className="text-xs font-medium uppercase tracking-widest text-secondary">
                      Demo coming soon
                    </span>
                  </div>
                )}
              </div>

              <div className="w-full min-w-0 text-left">
                <p className="text-sm font-medium uppercase tracking-widest text-accent">
                  {demo.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-primary sm:text-sm">
                  {demo.body}
                </p>
                <p className="mt-4 text-sm font-semibold text-accent transition-colors group-hover:underline">
                  {demo.cta} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
