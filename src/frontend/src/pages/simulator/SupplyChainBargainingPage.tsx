import PageLayout from '@/components/PageLayout';
import SupplyChainBargainingGame from '@/components/simulator/bargaining/SupplyChainBargainingGame';

export default function SupplyChainBargainingPage() {
  return (
    <PageLayout
      title="Supply Chain Bargaining Simulator"
      description="Negotiate optimal splits in supply chain partnerships. Learn how bargaining power and disagreement points determine cooperative outcomes."
    >
      <SupplyChainBargainingGame />
    </PageLayout>
  );
}
