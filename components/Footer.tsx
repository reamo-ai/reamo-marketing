export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:grid lg:grid-cols-3 lg:items-center lg:gap-4 lg:px-8 lg:py-6">
        <a href="/" className="flex items-center gap-2 lg:justify-self-start">
          <span className="text-xl font-semibold tracking-tight text-primary">
            Reamo
          </span>
        </a>

        <p className="text-center text-xs leading-snug text-secondary lg:justify-self-center">
          ©2026 Reamo LLC. All rights reserved.
        </p>

        <nav className="flex flex-col items-center gap-1 sm:gap-0.5 lg:items-end lg:justify-self-end">
          <a
            href="/about-us"
            className="text-xs text-secondary transition-colors hover:text-primary"
          >
            About Us
          </a>
          <a
            href="/contact-us"
            className="text-xs text-secondary transition-colors hover:text-primary"
          >
            Contact
          </a>
          <a
            href="/privacy-policy"
            className="text-xs text-secondary transition-colors hover:text-primary"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-xs text-secondary transition-colors hover:text-primary"
          >
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
}
