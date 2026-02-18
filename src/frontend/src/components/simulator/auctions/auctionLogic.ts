export type AuctionType = 'first-price' | 'second-price';

export interface AuctionResult {
  winner: 'player1' | 'player2' | 'tie';
  pricePaid: number;
  player1Payoff: number;
  player2Payoff: number;
}

export function resolveAuction(
  auctionType: AuctionType,
  player1Bid: number,
  player2Bid: number,
  player1Valuation: number,
  player2Valuation: number
): AuctionResult {
  let winner: 'player1' | 'player2' | 'tie';
  let pricePaid: number;

  if (player1Bid > player2Bid) {
    winner = 'player1';
    pricePaid = auctionType === 'first-price' ? player1Bid : player2Bid;
  } else if (player2Bid > player1Bid) {
    winner = 'player2';
    pricePaid = auctionType === 'first-price' ? player2Bid : player1Bid;
  } else {
    winner = 'tie';
    pricePaid = player1Bid;
  }

  let player1Payoff = 0;
  let player2Payoff = 0;

  if (winner === 'player1') {
    player1Payoff = player1Valuation - pricePaid;
  } else if (winner === 'player2') {
    player2Payoff = player2Valuation - pricePaid;
  } else {
    // Tie: split equally (simplified)
    player1Payoff = (player1Valuation - pricePaid) / 2;
    player2Payoff = (player2Valuation - pricePaid) / 2;
  }

  return {
    winner,
    pricePaid,
    player1Payoff,
    player2Payoff,
  };
}

export function validateBid(bid: number, valuation: number): string | null {
  if (bid < 0) return 'Bid cannot be negative';
  if (bid > valuation * 2) return 'Bid seems unreasonably high';
  return null;
}
