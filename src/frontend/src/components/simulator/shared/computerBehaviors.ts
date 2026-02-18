export type ComputerBehavior = 'random' | 'fixed' | 'rule-based';

export interface ComputerBehaviorOption {
  value: ComputerBehavior;
  label: string;
  description: string;
}

export const computerBehaviorOptions: ComputerBehaviorOption[] = [
  {
    value: 'random',
    label: 'Random',
    description: 'Computer makes random choices',
  },
  {
    value: 'fixed',
    label: 'Fixed Strategy',
    description: 'Computer follows a predetermined strategy',
  },
  {
    value: 'rule-based',
    label: 'Rule-Based',
    description: 'Computer uses strategic logic (e.g., Tit-for-Tat, Best Response)',
  },
];

// Prisoner's Dilemma computer behaviors
export type PDAction = 'cooperate' | 'defect';

export function getPDComputerAction(
  behavior: ComputerBehavior,
  history: PDAction[],
  opponentHistory: PDAction[]
): PDAction {
  switch (behavior) {
    case 'random':
      return Math.random() < 0.5 ? 'cooperate' : 'defect';
    case 'fixed':
      return 'defect'; // Always defect (dominant strategy in one-shot)
    case 'rule-based':
      // Tit-for-Tat: cooperate first, then copy opponent's last move
      if (opponentHistory.length === 0) return 'cooperate';
      return opponentHistory[opponentHistory.length - 1];
    default:
      return 'cooperate';
  }
}

// Auction computer behaviors
export function getAuctionComputerBid(
  behavior: ComputerBehavior,
  valuation: number,
  auctionType: 'first-price' | 'second-price'
): number {
  switch (behavior) {
    case 'random':
      return Math.random() * valuation;
    case 'fixed':
      // Fixed rule: bid 70% of valuation
      return valuation * 0.7;
    case 'rule-based':
      // Optimal strategy based on auction type
      if (auctionType === 'second-price') {
        return valuation; // Truthful bidding
      } else {
        return valuation * 0.8; // Shade bid in first-price
      }
    default:
      return valuation * 0.7;
  }
}

// Market Entry computer behaviors
export type MarketAction = 'enter' | 'stay-out';

export function getMarketEntryComputerAction(
  behavior: ComputerBehavior,
  playerAction: MarketAction | null,
  payoffs: { enterEnter: number; enterStayOut: number; stayOutEnter: number; stayOutStayOut: number }
): MarketAction {
  switch (behavior) {
    case 'random':
      return Math.random() < 0.5 ? 'enter' : 'stay-out';
    case 'fixed':
      return 'enter'; // Always enter
    case 'rule-based':
      // Best response to player's action
      if (!playerAction) return 'enter';
      if (playerAction === 'enter') {
        return payoffs.stayOutEnter > payoffs.enterEnter ? 'stay-out' : 'enter';
      } else {
        return payoffs.enterStayOut > payoffs.stayOutStayOut ? 'enter' : 'stay-out';
      }
    default:
      return 'enter';
  }
}

// Bargaining computer behaviors
export function getBargainingComputerDemand(
  behavior: ComputerBehavior,
  totalSurplus: number,
  disagreementPayoff: number,
  bargainingPower: number
): number {
  switch (behavior) {
    case 'random':
      const minDemand = disagreementPayoff;
      const maxDemand = totalSurplus - disagreementPayoff;
      return minDemand + Math.random() * (maxDemand - minDemand);
    case 'fixed':
      // Fixed demand: 60% of surplus
      return totalSurplus * 0.6;
    case 'rule-based':
      // Nash bargaining solution
      const availableSurplus = totalSurplus - 2 * disagreementPayoff;
      return disagreementPayoff + availableSurplus * bargainingPower;
    default:
      return totalSurplus * 0.5;
  }
}
