import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="relative z-[2] flex items-center justify-between bg-white px-page py-5 max-md:flex-col max-md:gap-3 max-md:text-center"
      data-nav-surface="light"
    >
      <span className="text-xs text-black/40">Copyright ©2026 Reamo, LLC</span>
      <nav className="flex gap-5" aria-label="Footer">
        <Link href="/privacy-policy" className="text-xs text-black/40 no-underline hover:text-black/70">
          Privacy
        </Link>
        <Link href="/terms-of-service" className="text-xs text-black/40 no-underline hover:text-black/70">
          Terms
        </Link>
      </nav>
    </footer>
  );
}
