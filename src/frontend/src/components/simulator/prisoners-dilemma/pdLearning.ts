import { LearningOutput } from '../shared/learningOutputTypes';
import { PDAction, PDRoundResult } from './pdLogic';
import { PDPayoffs } from '../shared/presets';

export function generatePDLearningOutput(
  p1Action: PDAction,
  p2Action: PDAction,
  p1Payoff: number,
  p2Payoff: number,
  payoffs: PDPayoffs,
  equilibria: string[]
): LearningOutput {
  const outcomeKey = `(${p1Action === 'cooperate' ? 'Cooperate' : 'Defect'}, ${
    p2Action === 'cooperate' ? 'Cooperate' : 'Defect'
  })`;
  const isEquilibrium = equilibria.includes(outcomeKey);

  let strategyAnalysis = '';
  let incentiveAnalysis = '';
  let businessImplication = '';

  if (p1Action === 'cooperate' && p2Action === 'cooperate') {
    strategyAnalysis = 'Both players chose to cooperate, achieving mutual benefit.';
    incentiveAnalysis =
      'However, each player has an incentive to defect unilaterally to gain a higher payoff, making this outcome unstable in one-shot games.';
    businessImplication =
      'In business, mutual cooperation (e.g., fair pricing, quality standards) benefits both parties but requires trust or enforcement mechanisms.';
  } else if (p1Action === 'defect' && p2Action === 'defect') {
    strategyAnalysis = 'Both players chose to defect, resulting in mutual defection.';
    incentiveAnalysis =
      'Neither player can improve by switching to cooperation alone, making this a stable Nash equilibrium despite lower payoffs than mutual cooperation.';
    businessImplication =
      'This represents competitive markets where firms undercut each other, leading to lower profits for all. Collusion or cooperation could improve outcomes but is difficult to sustain.';
  } else {
    const defector = p1Action === 'defect' ? 'Player 1' : 'Player 2';
    const cooperator = p1Action === 'cooperate' ? 'Player 1' : 'Player 2';
    strategyAnalysis = `${defector} defected while ${cooperator} cooperated, exploiting the cooperator's trust.`;
    incentiveAnalysis = `${defector} gained the highest payoff while ${cooperator} received the lowest. The cooperator would want to switch to defection in future rounds.`;
    businessImplication =
      'This asymmetric outcome shows the risk of being exploited when cooperating with an untrustworthy partner. In business, this could be a supplier cutting quality or a partner breaking agreements.';
  }

  return {
    strategies: {
      player1: p1Action === 'cooperate' ? 'Cooperate' : 'Defect',
      player2: p2Action === 'cooperate' ? 'Cooperate' : 'Defect',
    },
    payoffs: {
      player1: p1Payoff,
      player2: p2Payoff,
    },
    equilibrium: {
      isEquilibrium,
      allEquilibria: equilibria,
      explanation: isEquilibrium
        ? 'This outcome is a Nash equilibrium. Neither player can improve their payoff by unilaterally changing their strategy.'
        : 'This outcome is not a Nash equilibrium. At least one player would benefit from changing their strategy.',
    },
    explanation: {
      title: 'Strategic Analysis',
      sections: [
        {
          heading: 'Outcome',
          content: strategyAnalysis,
        },
        {
          heading: 'Incentives',
          content: incentiveAnalysis,
        },
        {
          heading: 'Business Interpretation',
          content: businessImplication,
        },
      ],
    },
  };
}

export function generateRepeatedGameSummary(results: PDRoundResult[], totalP1: number, totalP2: number): string {
  const cooperationCount = {
    p1: results.filter((r) => r.player1Action === 'cooperate').length,
    p2: results.filter((r) => r.player2Action === 'cooperate').length,
  };

  const avgP1 = (totalP1 / results.length).toFixed(1);
  const avgP2 = (totalP2 / results.length).toFixed(1);

  return `Over ${results.length} rounds, Player 1 cooperated ${cooperationCount.p1} times and Player 2 cooperated ${cooperationCount.p2} times. Player 1 earned a total of ${totalP1} (avg: ${avgP1} per round) and Player 2 earned ${totalP2} (avg: ${avgP2} per round). ${
    cooperationCount.p1 > results.length / 2 && cooperationCount.p2 > results.length / 2
      ? 'High cooperation led to better outcomes for both players.'
      : 'Low cooperation resulted in suboptimal payoffs, demonstrating the challenge of sustaining cooperation.'
  }`;
}
