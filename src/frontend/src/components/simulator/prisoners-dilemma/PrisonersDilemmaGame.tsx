import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ComputerBehaviorSelect from '../shared/ComputerBehaviorSelect';
import ConfigurationModeToggle from '../shared/ConfigurationModeToggle';
import LearningOutputPanel from '../shared/LearningOutputPanel';
import PayoffBarComparison from '../visualizations/PayoffBarComparison';
import PayoffTrendLineChart from '../visualizations/PayoffTrendLineChart';
import { ComputerBehavior, getPDComputerAction } from '../shared/computerBehaviors';
import { pdPresets, PDPayoffs } from '../shared/presets';
import { calculatePDPayoffs, findNashEquilibrium, runRepeatedGame, calculateTotalPayoffs, PDAction } from './pdLogic';
import { generatePDLearningOutput, generateRepeatedGameSummary } from './pdLearning';

type GameMode = 'pvp' | 'pvc';
type RoundMode = 'single' | 'repeated';

export default function PrisonersDilemmaGame() {
  const [gameMode, setGameMode] = useState<GameMode>('pvc');
  const [roundMode, setRoundMode] = useState<RoundMode>('single');
  const [computerBehavior, setComputerBehavior] = useState<ComputerBehavior>('rule-based');

  const [selectedPreset, setSelectedPreset] = useState('Classic');
  const [payoffs, setPayoffs] = useState<PDPayoffs>(pdPresets[0].payoffs);
  const [isCustom, setIsCustom] = useState(false);

  const [p1Action, setP1Action] = useState<PDAction | null>(null);
  const [p2Action, setP2Action] = useState<PDAction | null>(null);
  const [result, setResult] = useState<any>(null);

  const [numRounds, setNumRounds] = useState(5);
  const [repeatedResults, setRepeatedResults] = useState<any[]>([]);
  const [repeatedSummary, setRepeatedSummary] = useState<string>('');

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      const preset = pdPresets.find((p) => p.name === presetName);
      if (preset) {
        setPayoffs(preset.payoffs);
      }
    }
    setResult(null);
    setRepeatedResults([]);
  };

  const handlePayoffChange = (outcome: keyof PDPayoffs, player: 'p1' | 'p2', value: string) => {
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

  const playSingleRound = () => {
    if (!p1Action) return;

    let finalP2Action: PDAction;
    if (gameMode === 'pvp') {
      if (!p2Action) return;
      finalP2Action = p2Action;
    } else {
      finalP2Action = getPDComputerAction(computerBehavior, [], [p1Action]);
    }

    const roundPayoffs = calculatePDPayoffs(p1Action, finalP2Action, payoffs);
    const equilibria = findNashEquilibrium(payoffs);
    const learningOutput = generatePDLearningOutput(
      p1Action,
      finalP2Action,
      roundPayoffs.p1,
      roundPayoffs.p2,
      payoffs,
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

  const playRepeatedRounds = () => {
    if (!p1Action) return;

    const p1Actions: PDAction[] = [];
    const p2Actions: PDAction[] = [];

    for (let i = 0; i < numRounds; i++) {
      const currentP1Action = i === 0 ? p1Action : (Math.random() < 0.5 ? 'cooperate' : 'defect');
      p1Actions.push(currentP1Action);

      if (gameMode === 'pvp') {
        const currentP2Action = Math.random() < 0.5 ? 'cooperate' : 'defect';
        p2Actions.push(currentP2Action);
      } else {
        const computerAction = getPDComputerAction(computerBehavior, p2Actions, p1Actions);
        p2Actions.push(computerAction);
      }
    }

    const results = runRepeatedGame(numRounds, p1Actions, p2Actions, payoffs);
    const totals = calculateTotalPayoffs(results);
    const summary = generateRepeatedGameSummary(results, totals.p1, totals.p2);

    setRepeatedResults(results);
    setRepeatedSummary(summary);
  };

  const resetGame = () => {
    setP1Action(null);
    setP2Action(null);
    setResult(null);
    setRepeatedResults([]);
    setRepeatedSummary('');
  };

  return (
    <div className="space-y-6">
      {/* Game Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Game Configuration</CardTitle>
          <CardDescription>Choose your game mode and configure payoffs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label>Round Mode</Label>
              <div className="flex gap-2">
                <Button
                  variant={roundMode === 'single' ? 'default' : 'outline'}
                  onClick={() => {
                    setRoundMode('single');
                    resetGame();
                  }}
                  className="flex-1"
                >
                  Single Round
                </Button>
                <Button
                  variant={roundMode === 'repeated' ? 'default' : 'outline'}
                  onClick={() => {
                    setRoundMode('repeated');
                    resetGame();
                  }}
                  className="flex-1"
                >
                  Repeated Rounds
                </Button>
              </div>
            </div>
          </div>

          {gameMode === 'pvc' && <ComputerBehaviorSelect value={computerBehavior} onChange={setComputerBehavior} />}

          {roundMode === 'repeated' && (
            <div className="space-y-2">
              <Label>Number of Rounds</Label>
              <Input
                type="number"
                min="2"
                max="20"
                value={numRounds}
                onChange={(e) => setNumRounds(parseInt(e.target.value) || 5)}
              />
            </div>
          )}

          <ConfigurationModeToggle
            presets={pdPresets}
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
                  <Label className="text-xs">Both Cooperate (C,C)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.CC.p1}
                      onChange={(e) => handlePayoffChange('CC', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.CC.p2}
                      onChange={(e) => handlePayoffChange('CC', 'p2', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">P1 Cooperate, P2 Defect (C,D)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.CD.p1}
                      onChange={(e) => handlePayoffChange('CD', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.CD.p2}
                      onChange={(e) => handlePayoffChange('CD', 'p2', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">P1 Defect, P2 Cooperate (D,C)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.DC.p1}
                      onChange={(e) => handlePayoffChange('DC', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.DC.p2}
                      onChange={(e) => handlePayoffChange('DC', 'p2', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Both Defect (D,D)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="P1"
                      value={payoffs.DD.p1}
                      onChange={(e) => handlePayoffChange('DD', 'p1', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="P2"
                      value={payoffs.DD.p2}
                      onChange={(e) => handlePayoffChange('DD', 'p2', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Strategies</CardTitle>
          <CardDescription>
            {roundMode === 'single'
              ? 'Select your action for this round'
              : 'Select your initial action (repeated rounds will vary)'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Player 1 Action</Label>
              <div className="flex gap-2">
                <Button
                  variant={p1Action === 'cooperate' ? 'default' : 'outline'}
                  onClick={() => setP1Action('cooperate')}
                  className="flex-1"
                >
                  Cooperate
                </Button>
                <Button
                  variant={p1Action === 'defect' ? 'default' : 'outline'}
                  onClick={() => setP1Action('defect')}
                  className="flex-1"
                >
                  Defect
                </Button>
              </div>
            </div>

            {gameMode === 'pvp' && (
              <div className="space-y-2">
                <Label>Player 2 Action</Label>
                <div className="flex gap-2">
                  <Button
                    variant={p2Action === 'cooperate' ? 'default' : 'outline'}
                    onClick={() => setP2Action('cooperate')}
                    className="flex-1"
                  >
                    Cooperate
                  </Button>
                  <Button
                    variant={p2Action === 'defect' ? 'default' : 'outline'}
                    onClick={() => setP2Action('defect')}
                    className="flex-1"
                  >
                    Defect
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={roundMode === 'single' ? playSingleRound : playRepeatedRounds}
              disabled={!p1Action || (gameMode === 'pvp' && roundMode === 'single' && !p2Action)}
              className="flex-1"
            >
              {roundMode === 'single' ? 'Play Round' : `Play ${numRounds} Rounds`}
            </Button>
            <Button onClick={resetGame} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Single Round Results */}
      {roundMode === 'single' && result && (
        <div className="space-y-4">
          <PayoffBarComparison player1Payoff={result.p1Payoff} player2Payoff={result.p2Payoff} />
          <LearningOutputPanel output={result.learningOutput} />
        </div>
      )}

      {/* Repeated Rounds Results */}
      {roundMode === 'repeated' && repeatedResults.length > 0 && (
        <div className="space-y-4">
          <PayoffTrendLineChart results={repeatedResults} />

          <Card>
            <CardHeader>
              <CardTitle>Repeated Game Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>{repeatedSummary}</AlertDescription>
              </Alert>

              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-sm">Round-by-Round Results</h4>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {repeatedResults.map((round, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm p-2 border rounded">
                      <span className="font-medium">Round {idx + 1}</span>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{round.player1Action === 'cooperate' ? 'C' : 'D'}</Badge>
                        <Badge variant="outline">{round.player2Action === 'cooperate' ? 'C' : 'D'}</Badge>
                        <span className="text-muted-foreground">
                          ({round.player1Payoff}, {round.player2Payoff})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
