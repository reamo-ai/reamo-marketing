export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full border-b border-[var(--color-border)] bg-[var(--color-background)] lg:static lg:sticky lg:z-50">
      <div className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex min-h-[44px] min-w-0 items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-primary sm:text-xl">
            Reamo
          </span>
        </a>

        <a
          href="https://app.reamo.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
        >
          Login
        </a>
      </div>
    </header>
  );
}
