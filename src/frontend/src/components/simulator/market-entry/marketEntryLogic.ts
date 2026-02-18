import { MarketEntryPayoffs } from '../shared/presets';

export type MarketAction = 'enter' | 'stay-out';

export interface MarketEntryResult {
  player1Action: MarketAction;
  player2Action: MarketAction;
  player1Payoff: number;
  player2Payoff: number;
}

export function calculateMarketEntryPayoffs(
  p1Action: MarketAction,
  p2Action: MarketAction,
  payoffs: MarketEntryPayoffs
): { p1: number; p2: number } {
  if (p1Action === 'enter' && p2Action === 'enter') {
    return payoffs.enterEnter;
  } else if (p1Action === 'enter' && p2Action === 'stay-out') {
    return payoffs.enterStayOut;
  } else if (p1Action === 'stay-out' && p2Action === 'enter') {
    return payoffs.stayOutEnter;
  } else {
    return payoffs.stayOutStayOut;
  }
}

export function findMarketEntryEquilibria(payoffs: MarketEntryPayoffs): string[] {
  const equilibria: string[] = [];

  // Check (Enter, Enter)
  if (payoffs.enterEnter.p1 >= payoffs.stayOutEnter.p1 && payoffs.enterEnter.p2 >= payoffs.enterStayOut.p2) {
    equilibria.push('(Enter, Enter)');
  }

  // Check (Enter, Stay Out)
  if (payoffs.enterStayOut.p1 >= payoffs.stayOutStayOut.p1 && payoffs.enterStayOut.p2 >= payoffs.enterEnter.p2) {
    equilibria.push('(Enter, Stay Out)');
  }

  // Check (Stay Out, Enter)
  if (payoffs.stayOutEnter.p1 >= payoffs.enterEnter.p1 && payoffs.stayOutEnter.p2 >= payoffs.stayOutStayOut.p2) {
    equilibria.push('(Stay Out, Enter)');
  }

  // Check (Stay Out, Stay Out)
  if (
    payoffs.stayOutStayOut.p1 >= payoffs.enterStayOut.p1 &&
    payoffs.stayOutStayOut.p2 >= payoffs.stayOutEnter.p2
  ) {
    equilibria.push('(Stay Out, Stay Out)');
  }

  return equilibria;
}

export function getBestResponse(
  opponentAction: MarketAction,
  payoffs: MarketEntryPayoffs,
  forPlayer: 'p1' | 'p2'
): MarketAction {
  if (forPlayer === 'p1') {
    if (opponentAction === 'enter') {
      return payoffs.enterEnter.p1 >= payoffs.stayOutEnter.p1 ? 'enter' : 'stay-out';
    } else {
      return payoffs.enterStayOut.p1 >= payoffs.stayOutStayOut.p1 ? 'enter' : 'stay-out';
    }
  } else {
    if (opponentAction === 'enter') {
      return payoffs.enterEnter.p2 >= payoffs.enterStayOut.p2 ? 'enter' : 'stay-out';
    } else {
      return payoffs.stayOutEnter.p2 >= payoffs.stayOutStayOut.p2 ? 'enter' : 'stay-out';
    }
  }
}
