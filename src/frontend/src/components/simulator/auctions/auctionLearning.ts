import { LearningOutput } from '../shared/learningOutputTypes';
import { AuctionType, AuctionResult } from './auctionLogic';

export function generateAuctionLearningOutput(
  auctionType: AuctionType,
  result: AuctionResult,
  player1Bid: number,
  player2Bid: number,
  player1Valuation: number,
  player2Valuation: number
): LearningOutput {
  let outcomeAnalysis = '';
  let strategyRecommendation = '';
  let businessImplication = '';

  if (result.winner === 'player1') {
    outcomeAnalysis = `Player 1 won the auction with a bid of $${player1Bid.toFixed(
      2
    )} and paid $${result.pricePaid.toFixed(2)}, earning a payoff of $${result.player1Payoff.toFixed(2)}.`;
  } else if (result.winner === 'player2') {
    outcomeAnalysis = `Player 2 won the auction with a bid of $${player2Bid.toFixed(
      2
    )} and paid $${result.pricePaid.toFixed(2)}, earning a payoff of $${result.player2Payoff.toFixed(2)}.`;
  } else {
    outcomeAnalysis = `The auction resulted in a tie with both players bidding $${player1Bid.toFixed(2)}.`;
  }

  if (auctionType === 'second-price') {
    strategyRecommendation =
      'In a second-price (Vickrey) auction, bidding your true valuation is a dominant strategy. You pay the second-highest bid if you win, so there is no incentive to shade your bid or overbid. Player 1 should bid $' +
      player1Valuation.toFixed(2) +
      ' and Player 2 should bid $' +
      player2Valuation.toFixed(2) +
      '.';
    businessImplication =
      'Second-price auctions encourage truthful bidding, making them useful for procurement and online advertising (e.g., Google Ads). Bidders reveal their true willingness to pay without strategic manipulation.';
  } else {
    strategyRecommendation =
      'In a first-price auction, you should shade your bid below your valuation to maximize profit. The optimal bid depends on your beliefs about competitors. Bidding too high reduces profit; bidding too low risks losing. A common strategy is to bid a fraction (e.g., 70-90%) of your valuation.';
    businessImplication =
      'First-price auctions are common in government contracts and art sales. Winners often experience "winner\'s curse" if they overbid. Strategic shading balances winning probability with profit margin.';
  }

  return {
    strategies: {
      player1: `Bid: $${player1Bid.toFixed(2)} (Valuation: $${player1Valuation.toFixed(2)})`,
      player2: `Bid: $${player2Bid.toFixed(2)} (Valuation: $${player2Valuation.toFixed(2)})`,
    },
    payoffs: {
      player1: result.player1Payoff,
      player2: result.player2Payoff,
    },
    explanation: {
      title: 'Auction Analysis',
      sections: [
        {
          heading: 'Outcome',
          content: outcomeAnalysis,
        },
        {
          heading: 'Optimal Strategy',
          content: strategyRecommendation,
        },
        {
          heading: 'Business Application',
          content: businessImplication,
        },
      ],
    },
  };
}
