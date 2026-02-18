import { PDPayoffs } from '../shared/presets';

export type PDAction = 'cooperate' | 'defect';

export interface PDRoundResult {
  player1Action: PDAction;
  player2Action: PDAction;
  player1Payoff: number;
  player2Payoff: number;
}

export function calculatePDPayoffs(
  p1Action: PDAction,
  p2Action: PDAction,
  payoffs: PDPayoffs
): { p1: number; p2: number } {
  if (p1Action === 'cooperate' && p2Action === 'cooperate') {
    return payoffs.CC;
  } else if (p1Action === 'cooperate' && p2Action === 'defect') {
    return payoffs.CD;
  } else if (p1Action === 'defect' && p2Action === 'cooperate') {
    return payoffs.DC;
  } else {
    return payoffs.DD;
  }
}

export function findNashEquilibrium(payoffs: PDPayoffs): string[] {
  const equilibria: string[] = [];

  // Check (Cooperate, Cooperate)
  const ccPayoffs = payoffs.CC;
  const dcPayoffs = payoffs.DC;
  const cdPayoffs = payoffs.CD;
  const ddPayoffs = payoffs.DD;

  // (C, C) is equilibrium if neither wants to deviate
  if (ccPayoffs.p1 >= dcPayoffs.p1 && ccPayoffs.p2 >= cdPayoffs.p2) {
    equilibria.push('(Cooperate, Cooperate)');
  }

  // (C, D) is equilibrium
  if (cdPayoffs.p1 >= ddPayoffs.p1 && cdPayoffs.p2 >= ccPayoffs.p2) {
    equilibria.push('(Cooperate, Defect)');
  }

  // (D, C) is equilibrium
  if (dcPayoffs.p1 >= ccPayoffs.p1 && dcPayoffs.p2 >= ddPayoffs.p2) {
    equilibria.push('(Defect, Cooperate)');
  }

  // (D, D) is equilibrium
  if (ddPayoffs.p1 >= cdPayoffs.p1 && ddPayoffs.p2 >= dcPayoffs.p2) {
    equilibria.push('(Defect, Defect)');
  }

  return equilibria;
}

export function runRepeatedGame(
  rounds: number,
  p1Actions: PDAction[],
  p2Actions: PDAction[],
  payoffs: PDPayoffs
): PDRoundResult[] {
  const results: PDRoundResult[] = [];

  for (let i = 0; i < rounds; i++) {
    const roundPayoffs = calculatePDPayoffs(p1Actions[i], p2Actions[i], payoffs);
    results.push({
      player1Action: p1Actions[i],
      player2Action: p2Actions[i],
      player1Payoff: roundPayoffs.p1,
      player2Payoff: roundPayoffs.p2,
    });
  }

  return results;
}

export function calculateTotalPayoffs(results: PDRoundResult[]): { p1: number; p2: number } {
  return results.reduce(
    (acc, result) => ({
      p1: acc.p1 + result.player1Payoff,
      p2: acc.p2 + result.player2Payoff,
    }),
    { p1: 0, p2: 0 }
  );
}
