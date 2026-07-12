import Link from 'next/link';
import RequestAccessForm from '@/components/RequestAccessForm';

export const metadata = {
  title: 'Apply for Access | Reamo',
  description:
    'Reamo is invite-only. Apply for access to join a limited number of teams using AI to handle real estate admin automatically.',
  alternates: { canonical: '/waitlist' },
};

export default function RequestAccessPage() {
  return (
    <div
      className="flex min-h-[calc(100vh-var(--nav-height))] flex-col items-center bg-white px-page py-20"
      data-nav-surface="light"
    >
      <div className="mb-10 max-w-lg text-center">
        <p className="section-eyebrow mb-6 text-brand-blue-light">Invite only</p>
        <h1 className="section-headline mb-5 text-black">Join the waitlist</h1>
        <p className="mx-auto font-[family-name:var(--font-dm-sans),sans-serif] text-[17px] font-medium leading-[1.55] text-neutral-600">
          We&apos;re currently partnering with a limited number of teams and brokerages. If you think
          Reamo is a good fit for your brokerage or team, fill out this form and we&apos;ll be in touch.
        </p>
      </div>

      <RequestAccessForm />

      <Link
        href="/"
        className="mt-10 text-sm text-[rgba(0,0,0,0.4)] no-underline hover:text-[rgba(0,0,0,0.7)]"
      >
        ← Back to homepage
      </Link>
    </div>
  );
}
