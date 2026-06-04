import PlanLandingPage from '@/components/PlanLandingPage';

export const metadata = {
  title: 'Team Plan | Reamo',
  description:
    'Reamo for agent teams up to 25 seats — team dashboard, seat management, and everything in Agent on one invoice.',
};

export default function TeamPage() {
  return (
    <main>
      <PlanLandingPage plan="team" />
    </main>
  );
}
