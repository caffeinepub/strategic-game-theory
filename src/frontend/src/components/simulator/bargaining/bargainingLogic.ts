export interface BargainingResult {
  player1Share: number;
  player2Share: number;
  player1Gain: number;
  player2Gain: number;
}

export function calculateNashBargainingSolution(
  totalSurplus: number,
  disagreementP1: number,
  disagreementP2: number,
  bargainingPowerP1: number
): BargainingResult {
  const availableSurplus = totalSurplus - disagreementP1 - disagreementP2;
  const player1Share = disagreementP1 + availableSurplus * bargainingPowerP1;
  const player2Share = disagreementP2 + availableSurplus * (1 - bargainingPowerP1);

  return {
    player1Share,
    player2Share,
    player1Gain: player1Share - disagreementP1,
    player2Gain: player2Share - disagreementP2,
  };
}

export function validateBargainingParams(
  totalSurplus: number,
  disagreementP1: number,
  disagreementP2: number
): string | null {
  if (totalSurplus <= 0) return 'Total surplus must be positive';
  if (disagreementP1 < 0 || disagreementP2 < 0) return 'Disagreement payoffs cannot be negative';
  if (disagreementP1 + disagreementP2 >= totalSurplus) {
    return 'Sum of disagreement payoffs must be less than total surplus';
  }
  return null;
}
