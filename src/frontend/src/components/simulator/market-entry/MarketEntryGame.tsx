import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ComputerBehaviorSelect from '../shared/ComputerBehaviorSelect';
import ConfigurationModeToggle from '../shared/ConfigurationModeToggle';
import LearningOutputPanel from '../shared/LearningOutputPanel';
import PayoffBarComparison from '../visualizations/PayoffBarComparison';
import PayoffMatrixViz from '@/components/visualizations/PayoffMatrixViz';
import { ComputerBehavior, getMarketEntryComputerAction } from '../shared/computerBehaviors';
import { marketEntryPresets, MarketEntryPayoffs } from '../shared/presets';
import { MarketAction, calculateMarketEntryPayoffs, findMarketEntryEquilibria, getBestResponse } from './marketEntryLogic';
import { generateMarketEntryLearningOutput } from './marketEntryLearning';

type GameMode = 'pvp' | 'pvc';

export default function MarketEntryGame() {
  const [gameMode, setGameMode] = useState<GameMode>('pvc');
  const [computerBehavior, setComputerBehavior] = useState<ComputerBehavior>('rule-based');

  const [selectedPreset, setSelectedPreset] = useState('Competitive Market');
  const [payoffs, setPayoffs] = useState<MarketEntryPayoffs>(marketEntryPresets[0].payoffs);
  const [isCustom, setIsCustom] = useState(false);

  const [p1Action, setP1Action] = useState<MarketAction | null>(null);
  const [p2Action, setP2Action] = useState<MarketAction | null>(null);
  const [result, setResult] = useState<any>(null);

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      const preset = marketEntryPresets.find((p) => p.name === presetName);
      if (preset) {
        setPayoffs(preset.payoffs);
      }
    }
    setResult(null);
  };

  const handlePayoffChange = (outcome: keyof MarketEntryPayoffs, player: 'p1' | 'p2', value: string) => {
    const numValue = parseFloat(value) || 0;
    setPayoffs((prev) => ({
      ...prev,
      [outcome]: {
        ...prev[outcome],
        [player]: numValue,
      },
    }));
    setIsCustom(true);
    setSelectedPreset('custom');
  };

  const playRound = () => {
    if (!p1Action) return;

    let finalP2Action: MarketAction;
    if (gameMode === 'pvp') {
      if (!p2Action) return;
      finalP2Action = p2Action;
    } else {
      if (computerBehavior === 'rule-based') {
        finalP2Action = getBestResponse(p1Action, payoffs, 'p2');
      } else {
        const p2Payoffs = {
          enterEnter: payoffs.enterEnter.p2,
          enterStayOut: payoffs.enterStayOut.p2,
          stayOutEnter: payoffs.stayOutEnter.p2,
          stayOutStayOut: payoffs.stayOutStayOut.p2,
        };
        finalP2Action = getMarketEntryComputerAction(computerBehavior, p1Action, p2Payoffs);
      }
    }

    const roundPayoffs = calculateMarketEntryPayoffs(p1Action, finalP2Action, payoffs);
    const equilibria = findMarketEntryEquilibria(payoffs);
    const learningOutput = generateMarketEntryLearningOutput(
      p1Action,
      finalP2Action,
      roundPayoffs.p1,
      roundPayoffs.p2,
      equilibria
    );

    setResult({
      p1Action,
      p2Action: finalP2Action,
      p1Payoff: roundPayoffs.p1,
      p2Payoff: roundPayoffs.p2,
      learningOutput,
    });
  };

  const resetGame = () => {
    setP1Action(null);
    setP2Action(null);
    setResult(null);
  };

  const equilibria = findMarketEntryEquilibria(payoffs);

  return (
    <div className="space-y-6">
      {/* Game Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Game Configuration</CardTitle>
          <CardDescription>Choose game mode and configure payoffs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Game Mode</Label>
            <div className="flex gap-2">
              <Button
                variant={gameMode === 'pvc' ? 'default' : 'outline'}
                onClick={() => {
                  setGameMode('pvc');
                  resetGame();
                }}
                className="flex-1"
              >
                Player vs Computer
              </Button>
              <Button
                variant={gameMode === 'pvp' ? 'default' : 'outline'}
                onClick={() => {
                  setGameMode('pvp');
                  resetGame();
                }}
                className="flex-1"
              >
                Player vs Player
              </Button>
            </div>
          </div>

          {gameMode === 'pvc' && <ComputerBehaviorSelect value={computerBehavior} onChange={setComputerBehavior} />}

          <ConfigurationModeToggle
            presets={marketEntryPresets}
            selectedPreset={selectedPreset}
            onPresetChange={handlePresetChange}
            isCustom={isCustom}
            label="Payoff Configuration"
          />

          {isCustom && (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
              <h4 className="font-semibold text-sm">Custom Payoffs</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Both Enter (E,E)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.enterEnter.p1}
                      onChange={(e) => handlePayoffChange('enterEnter', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.enterEnter.p2}
                      onChange={(e) => handlePayoffChange('enterEnter', 'p2', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">P1 Enter, P2 Stay Out (E,S)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.enterStayOut.p1}
                      onChange={(e) => handlePayoffChange('enterStayOut', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.enterStayOut.p2}
                      onChange={(e) => handlePayoffChange('enterStayOut', 'p2', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">P1 Stay Out, P2 Enter (S,E)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.stayOutEnter.p1}
                      onChange={(e) => handlePayoffChange('stayOutEnter', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.stayOutEnter.p2}
                      onChange={(e) => handlePayoffChange('stayOutEnter', 'p2', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Both Stay Out (S,S)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.stayOutStayOut.p1}
                      onChange={(e) => handlePayoffChange('stayOutStayOut', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.stayOutStayOut.p2}
                      onChange={(e) => handlePayoffChange('stayOutStayOut', 'p2', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payoff Matrix Display */}
      <PayoffMatrixViz
        payoffs={payoffs}
        equilibria={equilibria}
        highlightedOutcome={
          result
            ? {
                p1Action: result.p1Action,
                p2Action: result.p2Action,
              }
            : undefined
        }
      />

      {/* Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Strategies</CardTitle>
          <CardDescription>Select your market entry decision</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Player 1 Decision</Label>
              <div className="flex gap-2">
                <Button
                  variant={p1Action === 'enter' ? 'default' : 'outline'}
                  onClick={() => setP1Action('enter')}
                  className="flex-1"
                >
                  Enter
                </Button>
                <Button
                  variant={p1Action === 'stay-out' ? 'default' : 'outline'}
                  onClick={() => setP1Action('stay-out')}
                  className="flex-1"
                >
                  Stay Out
                </Button>
              </div>
            </div>

            {gameMode === 'pvp' && (
              <div className="space-y-2">
                <Label>Player 2 Decision</Label>
                <div className="flex gap-2">
                  <Button
                    variant={p2Action === 'enter' ? 'default' : 'outline'}
                    onClick={() => setP2Action('enter')}
                    className="flex-1"
                  >
                    Enter
                  </Button>
                  <Button
                    variant={p2Action === 'stay-out' ? 'default' : 'outline'}
                    onClick={() => setP2Action('stay-out')}
                    className="flex-1"
                  >
                    Stay Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={playRound}
              disabled={!p1Action || (gameMode === 'pvp' && !p2Action)}
              className="flex-1"
            >
              Play Round
            </Button>
            <Button onClick={resetGame} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <PayoffBarComparison player1Payoff={result.p1Payoff} player2Payoff={result.p2Payoff} />
          <LearningOutputPanel output={result.learningOutput} />
        </div>
      )}
    </div>
  );
}
