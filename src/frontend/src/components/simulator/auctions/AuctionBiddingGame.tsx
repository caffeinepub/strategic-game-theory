import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import ComputerBehaviorSelect from '../shared/ComputerBehaviorSelect';
import ConfigurationModeToggle from '../shared/ConfigurationModeToggle';
import LearningOutputPanel from '../shared/LearningOutputPanel';
import PayoffBarComparison from '../visualizations/PayoffBarComparison';
import { ComputerBehavior, getAuctionComputerBid } from '../shared/computerBehaviors';
import { auctionOpponentPresets } from '../shared/presets';
import { AuctionType, resolveAuction, validateBid } from './auctionLogic';
import { generateAuctionLearningOutput } from './auctionLearning';

type GameMode = 'pvp' | 'pvc';

export default function AuctionBiddingGame() {
  const [gameMode, setGameMode] = useState<GameMode>('pvc');
  const [auctionType, setAuctionType] = useState<AuctionType>('second-price');
  const [computerBehavior, setComputerBehavior] = useState<ComputerBehavior>('rule-based');

  const [selectedPreset, setSelectedPreset] = useState('Equal Competitor');
  const [player2Valuation, setPlayer2Valuation] = useState(75);
  const [isCustom, setIsCustom] = useState(false);

  const [player1Valuation, setPlayer1Valuation] = useState(100);
  const [player1Bid, setPlayer1Bid] = useState(80);
  const [player2Bid, setPlayer2Bid] = useState(60);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      const preset = auctionOpponentPresets.find((p) => p.name === presetName);
      if (preset) {
        setPlayer2Valuation(preset.valuation);
      }
    }
    setResult(null);
  };

  const runAuction = () => {
    setError('');

    const p1BidError = validateBid(player1Bid, player1Valuation);
    if (p1BidError) {
      setError(p1BidError);
      return;
    }

    let finalP2Bid: number;
    if (gameMode === 'pvp') {
      const p2BidError = validateBid(player2Bid, player2Valuation);
      if (p2BidError) {
        setError(p2BidError);
        return;
      }
      finalP2Bid = player2Bid;
    } else {
      finalP2Bid = getAuctionComputerBid(computerBehavior, player2Valuation, auctionType);
    }

    const auctionResult = resolveAuction(auctionType, player1Bid, finalP2Bid, player1Valuation, player2Valuation);
    const learningOutput = generateAuctionLearningOutput(
      auctionType,
      auctionResult,
      player1Bid,
      finalP2Bid,
      player1Valuation,
      player2Valuation
    );

    setResult({
      ...auctionResult,
      player2Bid: finalP2Bid,
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
          <CardTitle>Auction Configuration</CardTitle>
          <CardDescription>Choose auction type and game mode</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Auction Type</Label>
              <div className="flex gap-2">
                <Button
                  variant={auctionType === 'first-price' ? 'default' : 'outline'}
                  onClick={() => {
                    setAuctionType('first-price');
                    resetGame();
                  }}
                  className="flex-1"
                >
                  First-Price
                </Button>
                <Button
                  variant={auctionType === 'second-price' ? 'default' : 'outline'}
                  onClick={() => {
                    setAuctionType('second-price');
                    resetGame();
                  }}
                  className="flex-1"
                >
                  Second-Price
                </Button>
              </div>
            </div>

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
          </div>

          {gameMode === 'pvc' && (
            <>
              <ComputerBehaviorSelect value={computerBehavior} onChange={setComputerBehavior} />
              <ConfigurationModeToggle
                presets={auctionOpponentPresets}
                selectedPreset={selectedPreset}
                onPresetChange={handlePresetChange}
                isCustom={isCustom}
                label="Opponent Configuration"
              />
              {isCustom && (
                <div className="space-y-2">
                  <Label>Opponent Valuation: ${player2Valuation}</Label>
                  <Slider
                    value={[player2Valuation]}
                    onValueChange={(v) => setPlayer2Valuation(v[0])}
                    min={10}
                    max={200}
                    step={5}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Bidding Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Place Your Bids</CardTitle>
          <CardDescription>Enter valuations and bid amounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Player 1</h4>
              <div className="space-y-2">
                <Label>Your Valuation: ${player1Valuation}</Label>
                <Slider
                  value={[player1Valuation]}
                  onValueChange={(v) => setPlayer1Valuation(v[0])}
                  min={10}
                  max={200}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Your Bid</Label>
                <Input
                  type="number"
                  value={player1Bid}
                  onChange={(e) => setPlayer1Bid(parseFloat(e.target.value) || 0)}
                  min={0}
                  step={1}
                />
              </div>
            </div>

            {gameMode === 'pvp' && (
              <div className="space-y-3">
                <h4 className="font-semibold">Player 2</h4>
                <div className="space-y-2">
                  <Label>Valuation: ${player2Valuation}</Label>
                  <Slider
                    value={[player2Valuation]}
                    onValueChange={(v) => setPlayer2Valuation(v[0])}
                    min={10}
                    max={200}
                    step={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bid</Label>
                  <Input
                    type="number"
                    value={player2Bid}
                    onChange={(e) => setPlayer2Bid(parseFloat(e.target.value) || 0)}
                    min={0}
                    step={1}
                  />
                </div>
              </div>
            )}

            {gameMode === 'pvc' && (
              <div className="space-y-3">
                <h4 className="font-semibold">Computer (Player 2)</h4>
                <p className="text-sm text-muted-foreground">
                  Valuation: ${player2Valuation}
                  <br />
                  Bid will be determined by selected behavior
                </p>
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2">
            <Button onClick={runAuction} className="flex-1">
              Run Auction
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
              <CardTitle>Auction Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg font-semibold">
                Winner: {result.winner === 'player1' ? 'Player 1' : result.winner === 'player2' ? 'Player 2' : 'Tie'}
              </p>
              <p>Price Paid: ${result.pricePaid.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                Player 2 Bid: ${result.player2Bid.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <PayoffBarComparison player1Payoff={result.player1Payoff} player2Payoff={result.player2Payoff} />
          <LearningOutputPanel output={result.learningOutput} />
        </div>
      )}
    </div>
  );
}
