import PageLayout from '@/components/PageLayout';
import MarketEntryGame from '@/components/simulator/market-entry/MarketEntryGame';

export default function MarketEntryPage() {
  return (
    <PageLayout
      title="Market Entry Simulator"
      description="Analyze strategic market entry decisions. Understand how firms decide whether to enter competitive markets and how rivals respond to new entrants."
    >
      <MarketEntryGame />
    </PageLayout>
  );
}
