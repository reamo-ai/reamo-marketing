import ScrollReveal from '@/components/ScrollReveal';

export default function StatSection() {
  return (
    <ScrollReveal
      variant="reveal-up"
      className="relative z-[2] overflow-hidden bg-section-gutter px-page py-[200px] text-center max-md:py-[120px]"
    >
      <div
        className="font-montserrat pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[44vw] font-extrabold leading-none tracking-[-0.05em] text-white/[0.025]"
        aria-hidden
      >
        73%
      </div>
      <div className="relative z-[1]">
        <div className="font-montserrat text-[clamp(80px,18vw,200px)] font-extrabold leading-none tracking-[-0.05em] text-white">
          73%
        </div>
        <p className="mx-auto mt-5 max-w-[500px] text-[clamp(16px,2vw,24px)] font-light leading-[1.5] text-white/[0.38]">
          of agent time spent on work
          <br />
          that doesn&apos;t close a single deal.
        </p>
      </div>
    </ScrollReveal>
  );
}
