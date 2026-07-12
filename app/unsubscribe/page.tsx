import UnsubscribeForm from '@/components/UnsubscribeForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Unsubscribe | Reamo',
  description: 'Unsubscribe from Reamo product updates.',
  alternates: { canonical: '/unsubscribe' },
};

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen px-page py-12 sm:py-16 lg:py-24">
      <Suspense
        fallback={
          <div className="mx-auto max-w-md text-sm text-secondary">Loading…</div>
        }
      >
        <UnsubscribeForm />
      </Suspense>
    </div>
  );
}
