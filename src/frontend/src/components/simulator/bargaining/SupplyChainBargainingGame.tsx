import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import ComputerBehaviorSelect from '../shared/ComputerBehaviorSelect';
import ConfigurationModeToggle from '../shared/ConfigurationModeToggle';
import LearningOutputPanel from '../shared/LearningOutputPanel';
import { ComputerBehavior, getBargainingComputerDemand } from '../shared/computerBehaviors';
import { bargainingPresets, BargainingParams } from '../shared/presets';
import { calculateNashBargainingSolution, validateBargainingParams } from './bargainingLogic';
import { generateBargainingLearningOutput } from './bargainingLearning';

type GameMode = 'pvp' | 'pvc';

export default function SupplyChainBargainingGame() {
  const [gameMode, setGameMode] = useState<GameMode>('pvc');
  const [computerBehavior, setComputerBehavior] = useState<ComputerBehavior>('rule-based');

  const [selectedPreset, setSelectedPreset] = useState('Equal Power');
  const [params, setParams] = useState<BargainingParams>(bargainingPresets[0].params);
  const [isCustom, setIsCustom] = useState(false);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      const preset = bargainingPresets.find((p) => p.name === presetName);
      if (preset) {
        setParams(preset.params);
      }
    }
    setResult(null);
  };

  const runBargaining = () => {
    setError('');

    const validationError = validateBargainingParams(params.totalSurplus, params.disagreementP1, params.disagreementP2);
    if (validationError) {
      setError(validationError);
      return;
    }

    const bargainingResult = calculateNashBargainingSolution(
      params.totalSurplus,
      params.disagreementP1,
      params.disagreementP2,
      params.bargainingPowerP1
    );

    const learningOutput = generateBargainingLearningOutput(
      bargainingResult,
      params.totalSurplus,
      params.disagreementP1,
      params.disagreementP2,
      params.bargainingPowerP1
    );

    setResult({
      ...bargainingResult,
      learningOutput,
    });
  };

  const resetGame = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Game Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Bargaining Configuration</CardTitle>
          <CardDescription>Set up the bargaining scenario</CardDescription>
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
                vs Computer
              </Button>
              <Button
                variant={gameMode === 'pvp' ? 'default' : 'outline'}
                onClick={() => {
                  setGameMode('pvp');
                  resetGame();
                }}
                className="flex-1"
              >
                vs Player
              </Button>
            </div>
          </div>

          {gameMode === 'pvc' && <ComputerBehaviorSelect value={computerBehavior} onChange={setComputerBehavior} />}

          <ConfigurationModeToggle
            presets={bargainingPresets}
            selectedPreset={selectedPreset}
            onPresetChange={handlePresetChange}
            isCustom={isCustom}
            label="Scenario Configuration"
          />
        </CardContent>
      </Card>

      {/* Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Bargaining Parameters</CardTitle>
          <CardDescription>Adjust the total surplus, disagreement points, and bargaining power</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Total Surplus: ${params.totalSurplus}</Label>
            <Slider
              value={[params.totalSurplus]}
              onValueChange={(v) => {
                setParams((prev) => ({ ...prev, totalSurplus: v[0] }));
                setIsCustom(true);
                setSelectedPreset('custom');
              }}
              min={20}
              max={200}
              step={10}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Player 1 Disagreement Payoff: ${params.disagreementP1}</Label>
              <Slider
                value={[params.disagreementP1]}
                onValueChange={(v) => {
                  setParams((prev) => ({ ...prev, disagreementP1: v[0] }));
                  setIsCustom(true);
                  setSelectedPreset('custom');
                }}
                min={0}
                max={50}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label>Player 2 Disagreement Payoff: ${params.disagreementP2}</Label>
              <Slider
                value={[params.disagreementP2]}
                onValueChange={(v) => {
                  setParams((prev) => ({ ...prev, disagreementP2: v[0] }));
                  setIsCustom(true);
                  setSelectedPreset('custom');
                }}
                min={0}
                max={50}
                step={5}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Player 1 Bargaining Power: {(params.bargainingPowerP1 * 100).toFixed(0)}% (Player 2:{' '}
              {((1 - params.bargainingPowerP1) * 100).toFixed(0)}%)
            </Label>
            <Slider
              value={[params.bargainingPowerP1]}
              onValueChange={(v) => {
                setParams((prev) => ({ ...prev, bargainingPowerP1: v[0] }));
                setIsCustom(true);
                setSelectedPreset('custom');
              }}
              min={0}
              max={1}
              step={0.05}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2">
            <Button onClick={runBargaining} className="flex-1">
              Calculate Bargaining Solution
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
          <Card>
            <CardHeader>
              <CardTitle>Bargaining Outcome</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Player 1 (Supplier)</h4>
                  <p className="text-2xl font-bold text-primary">${result.player1Share.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    Gain over disagreement: ${result.player1Gain.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Player 2 (Retailer)</h4>
                  <p className="text-2xl font-bold text-primary">${result.player2Share.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    Gain over disagreement: ${result.player2Gain.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary">Surplus Split</span>
                  </div>
                </div>
                <div className="flex h-8 overflow-hidden text-xs bg-muted rounded">
                  <div
                    style={{ width: `${(result.player1Share / params.totalSurplus) * 100}%` }}
                    className="flex items-center justify-center bg-primary text-primary-foreground font-semibold"
                  >
                    P1: {((result.player1Share / params.totalSurplus) * 100).toFixed(0)}%
                  </div>
                  <div
                    style={{ width: `${(result.player2Share / params.totalSurplus) * 100}%` }}
                    className="flex items-center justify-center bg-secondary text-secondary-foreground font-semibold"
                  >
                    P2: {((result.player2Share / params.totalSurplus) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <LearningOutputPanel output={result.learningOutput} />
        </div>
      )}
    </div>
  );
}
