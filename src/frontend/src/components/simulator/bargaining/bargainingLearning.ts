import { LearningOutput } from '../shared/learningOutputTypes';
import { BargainingResult } from './bargainingLogic';

export function generateBargainingLearningOutput(
  result: BargainingResult,
  totalSurplus: number,
  disagreementP1: number,
  disagreementP2: number,
  bargainingPowerP1: number
): LearningOutput {
  const bargainingPowerP2 = 1 - bargainingPowerP1;

  let outcomeAnalysis = `The Nash bargaining solution allocates $${result.player1Share.toFixed(
    2
  )} to Player 1 and $${result.player2Share.toFixed(2)} to Player 2 from a total surplus of $${totalSurplus.toFixed(
    2
  )}.`;

  let powerAnalysis = '';
  if (bargainingPowerP1 > 0.6) {
    powerAnalysis =
      'Player 1 has strong bargaining power (' +
      (bargainingPowerP1 * 100).toFixed(0) +
      '%), capturing a larger share of the available surplus. This could reflect better alternatives, stronger negotiation skills, or market position.';
  } else if (bargainingPowerP1 < 0.4) {
    powerAnalysis =
      'Player 2 has strong bargaining power (' +
      (bargainingPowerP2 * 100).toFixed(0) +
      '%), capturing a larger share of the available surplus. This could reflect better alternatives, stronger negotiation skills, or market position.';
  } else {
    powerAnalysis =
      'Both players have roughly equal bargaining power, leading to a balanced split of the available surplus.';
  }

  let businessImplication =
    'In supply chain negotiations, bargaining power comes from alternatives (BATNA), switching costs, and market concentration. Suppliers with unique products have more power; retailers with many supplier options have more power. The disagreement points represent what each party earns if negotiations fail. Cooperative bargaining maximizes joint value, while competitive bargaining focuses on claiming value.';

  return {
    strategies: {
      player1: `Bargaining Power: ${(bargainingPowerP1 * 100).toFixed(0)}%`,
      player2: `Bargaining Power: ${(bargainingPowerP2 * 100).toFixed(0)}%`,
    },
    payoffs: {
      player1: result.player1Share,
      player2: result.player2Share,
    },
    explanation: {
      title: 'Bargaining Analysis',
      sections: [
        {
          heading: 'Outcome',
          content: outcomeAnalysis,
        },
        {
          heading: 'Gains Over Disagreement',
          content: `Player 1 gains $${result.player1Gain.toFixed(
            2
          )} over their disagreement payoff of $${disagreementP1.toFixed(2)}. Player 2 gains $${result.player2Gain.toFixed(
            2
          )} over their disagreement payoff of $${disagreementP2.toFixed(
            2
          )}. Both parties benefit from cooperation compared to disagreement.`,
        },
        {
          heading: 'Bargaining Power',
          content: powerAnalysis,
        },
        {
          heading: 'Business Application',
          content: businessImplication,
        },
      ],
    },
  };
}
