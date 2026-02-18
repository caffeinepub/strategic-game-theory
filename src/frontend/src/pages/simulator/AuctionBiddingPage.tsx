import PageLayout from '@/components/PageLayout';
import AuctionBiddingGame from '@/components/simulator/auctions/AuctionBiddingGame';

export default function AuctionBiddingPage() {
  return (
    <PageLayout
      title="Auction Bidding Simulator"
      description="Learn optimal bidding strategies in first-price and second-price auctions. Discover why truthful bidding is dominant in Vickrey auctions and how to shade bids strategically."
    >
      <AuctionBiddingGame />
    </PageLayout>
  );
}
