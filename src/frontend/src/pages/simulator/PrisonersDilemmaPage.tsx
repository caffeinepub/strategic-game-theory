import PageLayout from '@/components/PageLayout';
import PrisonersDilemmaGame from '@/components/simulator/prisoners-dilemma/PrisonersDilemmaGame';

export default function PrisonersDilemmaPage() {
  return (
    <PageLayout
      title="Prisoner's Dilemma Simulator"
      description="Explore the classic game of cooperation vs. defection. Play single rounds or repeated games to understand how trust and retaliation shape strategic outcomes."
    >
      <PrisonersDilemmaGame />
    </PageLayout>
  );
}
