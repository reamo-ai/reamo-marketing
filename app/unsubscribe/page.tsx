import UnsubscribeForm from '@/components/UnsubscribeForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Unsubscribe | Reamo',
  description: 'Unsubscribe from Reamo product updates.',
};

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
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
