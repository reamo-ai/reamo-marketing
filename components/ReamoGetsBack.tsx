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

      <div className="mx-auto flex w-full min-w-0 max-w-7xl justify-center px-4 sm:px-16 lg:px-24">
        <h2 className="flex w-full min-w-0 max-w-full flex-col items-center px-2 text-center text-[clamp(1.75rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-primary sm:px-0">
          <span className="max-w-full sm:whitespace-nowrap">Get your time back</span>
          <span className="max-w-full sm:whitespace-nowrap">
            with Reamo<span className="text-accent">.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
