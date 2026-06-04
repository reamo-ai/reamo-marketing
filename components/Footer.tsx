export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-4 px-6 py-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 justify-self-start">
          <span className="text-xl font-semibold tracking-tight text-primary">
            Reamo
          </span>
        </a>

        <p className="justify-self-center text-center text-xs leading-snug text-secondary">
          ©2026 Reamo LLC. All rights reserved.
        </p>

        <nav className="flex flex-col items-end gap-0.5 justify-self-end">
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
