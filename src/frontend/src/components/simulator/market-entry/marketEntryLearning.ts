import { LearningOutput } from '../shared/learningOutputTypes';
import { MarketAction } from './marketEntryLogic';

export function generateMarketEntryLearningOutput(
  p1Action: MarketAction,
  p2Action: MarketAction,
  p1Payoff: number,
  p2Payoff: number,
  equilibria: string[]
): LearningOutput {
  const outcomeKey = `(${p1Action === 'enter' ? 'Enter' : 'Stay Out'}, ${
    p2Action === 'enter' ? 'Enter' : 'Stay Out'
  })`;
  const isEquilibrium = equilibria.includes(outcomeKey);

  let outcomeAnalysis = '';
  let strategicAnalysis = '';
  let businessImplication = '';

  if (p1Action === 'enter' && p2Action === 'enter') {
    outcomeAnalysis = 'Both firms entered the market, leading to competition and potentially lower profits.';
    strategicAnalysis =
      'When both enter, profits are split. Each firm must consider whether the competitor will enter. If entry costs are high, this outcome may result in losses for both.';
    businessImplication =
      'This represents competitive markets where multiple firms enter despite reduced profitability. Examples include ride-sharing, food delivery, and retail. First-mover advantages or differentiation can improve outcomes.';
  } else if (p1Action === 'stay-out' && p2Action === 'stay-out') {
    outcomeAnalysis = 'Both firms stayed out of the market, avoiding competition but also missing potential profits.';
    strategicAnalysis =
      'This outcome may occur when entry barriers are high or when firms fear aggressive competition. However, both firms miss the opportunity to capture market share.';
    businessImplication =
      'This represents markets with high uncertainty or entry costs where firms wait for clearer signals. Examples include emerging technologies or regulated industries.';
  } else {
    const entrant = p1Action === 'enter' ? 'Player 1' : 'Player 2';
    const stayer = p1Action === 'stay-out' ? 'Player 1' : 'Player 2';
    outcomeAnalysis = `${entrant} entered the market while ${stayer} stayed out, allowing ${entrant} to capture monopoly profits.`;
    strategicAnalysis = `${entrant} benefits from being the sole entrant, while ${stayer} avoids competition costs but earns lower payoffs. This asymmetric outcome often depends on timing, resources, or risk tolerance.`;
    businessImplication =
      'This represents first-mover advantage scenarios where one firm enters early and establishes market dominance. Examples include Amazon in e-commerce, Netflix in streaming, and Tesla in electric vehicles.';
  }

  return {
    strategies: {
      player1: p1Action === 'enter' ? 'Enter' : 'Stay Out',
      player2: p2Action === 'enter' ? 'Enter' : 'Stay Out',
    },
    payoffs: {
      player1: p1Payoff,
      player2: p2Payoff,
    },
    equilibrium: {
      isEquilibrium,
      allEquilibria: equilibria,
      explanation: isEquilibrium
        ? 'This outcome is a Nash equilibrium. Neither firm can improve its payoff by unilaterally changing its decision.'
        : 'This outcome is not a Nash equilibrium. At least one firm would benefit from changing its strategy given the other firm\'s choice.',
    },
    explanation: {
      title: 'Market Entry Analysis',
      sections: [
        {
          heading: 'Outcome',
          content: outcomeAnalysis,
        },
        {
          heading: 'Strategic Considerations',
          content: strategicAnalysis,
        },
        {
          heading: 'Business Application',
          content: businessImplication,
        },
      ],
    },
  };
}
