import Link from 'next/link';
import RequestAccessForm from '@/components/RequestAccessForm';

export const metadata = {
  title: 'Apply for Access | Reamo',
  description:
    'Reamo is invite-only. Apply for access to join a limited number of teams using AI to handle real estate admin automatically.',
};

export default function RequestAccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--nav-height))] flex-col items-center bg-near-black px-page py-20">
      <div className="mb-10 max-w-lg text-center">
        <p className="section-eyebrow mb-6 text-brand-blue-light">Invite only</p>
        <h1 className="section-headline mb-5 text-white">Join the waitlist</h1>
        <p className="mx-auto font-[family-name:var(--font-dm-sans),sans-serif] text-[17px] font-medium leading-[1.55] text-neutral-400">
          We&apos;re currently partnering with a limited number of teams and brokerages. If you think
          Reamo is a good fit for your brokerage or team, fill out this form and we&apos;ll be in touch.
        </p>
      </div>

      <RequestAccessForm />

      <Link
        href="/"
        className="mt-10 text-sm text-[rgba(255,255,255,0.4)] no-underline hover:text-[rgba(255,255,255,0.7)]"
      >
        ← Back to homepage
      </Link>
    </div>
  );
}
