export default function ReamoGetsBack() {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-[var(--color-background)] py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(0,212,160,0.2), transparent)',
        }}
      />

      <div className="mx-auto flex w-full max-w-7xl justify-center px-10 sm:px-16 lg:px-24">
        <h2 className="flex flex-col items-center text-center text-[clamp(2.25rem,10vw,7rem)] font-bold leading-[0.95] tracking-tight text-primary">
          <span className="whitespace-nowrap">Get your time back</span>
          <span className="whitespace-nowrap">
            with Reamo<span className="text-accent">.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
