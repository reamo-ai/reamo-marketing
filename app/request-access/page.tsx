import Link from 'next/link';

export const metadata = {
  title: 'Apply for Access | Reamo',
  description:
    'Reamo is invite-only. Apply for access to join a limited number of teams using AI to handle real estate admin automatically.',
};

export default function RequestAccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--nav-height))] flex-col items-center justify-center bg-black px-page py-20 text-center">
      <p className="section-eyebrow mb-6 text-white/25">
        Invite only
      </p>
      <h1 className="section-headline mb-5 max-w-xl text-white">
        Apply for access
      </h1>
      <p className="mx-auto mb-10 max-w-md text-[17px] font-light leading-[1.55] text-white/[0.38]">
        We&apos;re onboarding a limited number of agents and teams. Tell us about your business and
        we&apos;ll be in touch.
      </p>
      <p className="mb-8 text-sm text-white/30">Application form coming soon.</p>
      <Link
        href="mailto:sales@reamo.ai"
        className="inline-block rounded-full bg-white px-[30px] py-[13px] text-[15px] text-black no-underline transition-opacity hover:opacity-88"
      >
        Email sales@reamo.ai
      </Link>
      <Link href="/" className="mt-8 text-sm text-white/40 no-underline hover:text-white/70">
        ← Back to homepage
      </Link>
    </div>
  );
}
