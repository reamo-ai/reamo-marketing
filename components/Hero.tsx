import Link from 'next/link';

type HeroProps = {
  embedded?: boolean;
};

const SHOW_HERO_BUTTONS = false;

export default function Hero({ embedded = false }: HeroProps) {
  const content = (
    <>
      <div className="min-w-0 max-w-full pl-6 text-left md:pl-10">
        <h1 className="section-headline text-white">
          Reamo does the busywork
          <br />
          while you talk to clients.
        </h1>
      </div>

      {SHOW_HERO_BUTTONS ? (
        <div className="mt-12 flex flex-wrap items-center gap-3 max-w-full text-left">
          <Link
            href="/waitlist"
            className="inline-block rounded-full bg-black px-[30px] py-[13px] text-[15px] text-white no-underline transition-opacity hover:opacity-80"
          >
            Join waitlist
          </Link>
          <a
            href="#how-it-works"
            className="inline-block rounded-full border-2 border-black bg-transparent px-[30px] py-[13px] text-[15px] text-black no-underline transition-opacity hover:opacity-80"
          >
            Learn more
          </a>
        </div>
      ) : null}
    </>
  );

  if (embedded) {
    return (
      <div
        aria-label="Introduction"
        className="min-h-[100svh] pt-[var(--hero-offset-top)] pb-[var(--hero-offset-bottom)]"
      >
        {content}
      </div>
    );
  }

  return (
    <section
      aria-label="Introduction"
      className="relative flex w-full min-w-0 items-start bg-[var(--hero-bg)] px-page pt-[var(--hero-offset-top)] pb-[var(--hero-offset-bottom)]"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">{content}</div>
    </section>
  );
}
