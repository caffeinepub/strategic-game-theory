import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ModelAssumptionsNote from '../ModelAssumptionsNote';
import PayoffMatrixViz from '@/components/visualizations/PayoffMatrixViz';
import { Calculator } from 'lucide-react';

interface Payoff {
  player1: number;
  player2: number;
}

interface PayoffMatrix {
  enterEnter: Payoff;
  enterStayOut: Payoff;
  stayOutEnter: Payoff;
  stayOutStayOut: Payoff;
}

export default function MarketEntryGameModel() {
  const [payoffs, setPayoffs] = useState<PayoffMatrix>({
    enterEnter: { player1: -10, player2: -10 },
    enterStayOut: { player1: 50, player2: 0 },
    stayOutEnter: { player1: 0, player2: 50 },
    stayOutStayOut: { player1: 0, player2: 0 },
  });

  const [result, setResult] = useState<{
    equilibria: string[];
    recommendations: { player1: string; player2: string };
    explanation: string;
  } | null>(null);

  const updatePayoff = (key: keyof PayoffMatrix, player: 'player1' | 'player2', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setPayoffs((prev) => ({
        ...prev,
        [key]: { ...prev[key], [player]: numValue },
      }));
    }
  };

  const analyzeGame = () => {
    const equilibria: string[] = [];
    let explanation = '';

    // Check for Nash equilibria
    // (Enter, Enter): Check if neither wants to deviate
    const p1EnterBetterThanStayOut = payoffs.enterEnter.player1 >= payoffs.stayOutEnter.player1;
    const p2EnterBetterThanStayOut = payoffs.enterEnter.player2 >= payoffs.enterStayOut.player2;
    if (p1EnterBetterThanStayOut && p2EnterBetterThanStayOut) {
      equilibria.push('(Enter, Enter)');
    }

    // (Enter, Stay Out): Check if neither wants to deviate
    const p1EnterBetterWhenP2StaysOut = payoffs.enterStayOut.player1 >= payoffs.stayOutStayOut.player1;
    const p2StayOutBetterWhenP1Enters = payoffs.enterStayOut.player2 >= payoffs.enterEnter.player2;
    if (p1EnterBetterWhenP2StaysOut && p2StayOutBetterWhenP1Enters) {
      equilibria.push('(Enter, Stay Out)');
    }

    // (Stay Out, Enter): Check if neither wants to deviate
    const p1StayOutBetterWhenP2Enters = payoffs.stayOutEnter.player1 >= payoffs.enterEnter.player1;
    const p2EnterBetterWhenP1StaysOut = payoffs.stayOutEnter.player2 >= payoffs.stayOutStayOut.player2;
    if (p1StayOutBetterWhenP2Enters && p2EnterBetterWhenP1StaysOut) {
      equilibria.push('(Stay Out, Enter)');
    }

    // (Stay Out, Stay Out): Check if neither wants to deviate
    const p1StayOutBetterThanEnter = payoffs.stayOutStayOut.player1 >= payoffs.enterStayOut.player1;
    const p2StayOutBetterThanEnter = payoffs.stayOutStayOut.player2 >= payoffs.stayOutEnter.player2;
    if (p1StayOutBetterThanEnter && p2StayOutBetterThanEnter) {
      equilibria.push('(Stay Out, Stay Out)');
    }

    // Generate recommendations
    let recommendations = { player1: '', player2: '' };

    if (equilibria.length === 0) {
      explanation =
        'No pure strategy Nash equilibrium exists. This suggests a mixed strategy equilibrium where players randomize their choices. In practice, this indicates high strategic uncertainty and potential for coordination problems.';
      recommendations = {
        player1: 'Consider mixed strategies or first-mover advantage',
        player2: 'Consider mixed strategies or wait-and-see approach',
      };
    } else if (equilibria.length === 1) {
      explanation = `There is a unique Nash equilibrium: ${equilibria[0]}. This represents a stable outcome where neither player has an incentive to unilaterally change their strategy. Both players should follow this equilibrium strategy.`;
      const [p1Action, p2Action] = equilibria[0].replace('(', '').replace(')', '').split(', ');
      recommendations = { player1: p1Action, player2: p2Action };
    } else {
      explanation = `Multiple Nash equilibria exist: ${equilibria.join(', ')}. This creates a coordination problem. Players need to coordinate on which equilibrium to play, possibly through communication, commitment, or first-mover advantage.`;
      recommendations = {
        player1: 'Coordinate with Player 2 or seek first-mover advantage',
        player2: 'Coordinate with Player 1 or respond to their commitment',
      };
    }

    setResult({ equilibria, recommendations, explanation });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Market Entry Game (2x2)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Payoff Matrix (Player 1, Player 2)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Both Enter Market</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Player 1 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.enterEnter.player1}
                      onChange={(e) => updatePayoff('enterEnter', 'player1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Player 2 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.enterEnter.player2}
                      onChange={(e) => updatePayoff('enterEnter', 'player2', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Player 1 Enters, Player 2 Stays Out</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Player 1 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.enterStayOut.player1}
                      onChange={(e) => updatePayoff('enterStayOut', 'player1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Player 2 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.enterStayOut.player2}
                      onChange={(e) => updatePayoff('enterStayOut', 'player2', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Player 1 Stays Out, Player 2 Enters</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Player 1 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.stayOutEnter.player1}
                      onChange={(e) => updatePayoff('stayOutEnter', 'player1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Player 2 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.stayOutEnter.player2}
                      onChange={(e) => updatePayoff('stayOutEnter', 'player2', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Both Stay Out</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Player 1 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.stayOutStayOut.player1}
                      onChange={(e) => updatePayoff('stayOutStayOut', 'player1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Player 2 Payoff</Label>
                    <Input
                      type="number"
                      value={payoffs.stayOutStayOut.player2}
                      onChange={(e) => updatePayoff('stayOutStayOut', 'player2', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={analyzeGame} className="w-full md:w-auto">
            <Calculator className="mr-2 h-4 w-4" />
            Analyze Equilibrium
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <PayoffMatrixViz payoffs={payoffs} equilibria={result.equilibria} />

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold mb-2">Nash Equilibria</p>
                {result.equilibria.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {result.equilibria.map((eq, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        {eq}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No pure strategy Nash equilibrium</p>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Recommended Actions</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Player 1:</span> {result.recommendations.player1}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Player 2:</span> {result.recommendations.player2}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Explanation</p>
                <p className="text-sm text-muted-foreground">{result.explanation}</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <ModelAssumptionsNote
        assumptions={[
          'Two players making simultaneous entry decisions',
          'Complete information about payoff structure',
          'Players are rational and seek to maximize their own payoffs',
          'One-shot game (not repeated)',
        ]}
      />
    </div>
  );
}
