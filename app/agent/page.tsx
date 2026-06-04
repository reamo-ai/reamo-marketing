import PlanLandingPage from '@/components/PlanLandingPage';

export const metadata = {
  title: 'Agent Plan | Reamo',
  description:
    'Reamo for individual real estate agents — call notes, Dotloop, calendar, and CRM sheets handled automatically while you talk.',
};

export default function AgentPage() {
  return (
    <main>
      <PlanLandingPage plan="agent" />
    </main>
  );
}
