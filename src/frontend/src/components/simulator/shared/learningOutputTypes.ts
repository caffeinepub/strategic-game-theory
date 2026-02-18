export interface LearningOutput {
  strategies: {
    player1: string;
    player2: string;
  };
  payoffs: {
    player1: number;
    player2: number;
  };
  equilibrium?: {
    isEquilibrium: boolean;
    allEquilibria: string[];
    explanation: string;
  };
  explanation: {
    title: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
  };
}
