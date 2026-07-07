import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-[2] flex items-center justify-between bg-black px-page py-5 max-md:flex-col max-md:gap-3 max-md:text-center">
      <span className="text-xs text-white/30">Copyright ©2026 Reamo, LLC</span>
      <nav className="flex gap-5" aria-label="Footer">
        <Link href="/privacy-policy" className="text-xs text-white/30 no-underline hover:text-white/70">
          Privacy
        </Link>
        <Link href="/terms-of-service" className="text-xs text-white/30 no-underline hover:text-white/70">
          Terms
        </Link>
      </nav>
    </footer>
  );
}
