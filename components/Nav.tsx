export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-primary">
            Reamo
          </span>
        </a>

        <a
          href="https://app.reamo.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
        >
          Login
        </a>
      </div>
    </header>
  );
}
