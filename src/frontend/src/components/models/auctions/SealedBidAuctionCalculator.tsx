import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModelAssumptionsNote from '../ModelAssumptionsNote';
import { Calculator } from 'lucide-react';

export default function SealedBidAuctionCalculator() {
  const [numBidders, setNumBidders] = useState<string>('3');
  const [privateValue, setPrivateValue] = useState<string>('100');
  const [riskAttitude, setRiskAttitude] = useState<string>('neutral');
  const [result, setResult] = useState<{ suggestedBid: number; explanation: string } | null>(null);
  const [error, setError] = useState<string>('');

  const calculateBid = () => {
    setError('');
    const n = parseInt(numBidders);
    const v = parseFloat(privateValue);

    if (isNaN(n) || n < 2) {
      setError('Number of bidders must be at least 2');
      return;
    }
    if (isNaN(v) || v <= 0) {
      setError('Private value must be positive');
      return;
    }

    let suggestedBid: number;
    let explanation: string;

    // Adjust bid based on risk attitude
    const baseBid = v * ((n - 1) / n);

    if (riskAttitude === 'averse') {
      suggestedBid = baseBid * 1.1; // Bid slightly higher
      explanation = `As a risk-averse bidder in a sealed-bid auction with ${n} competitors, you should bid slightly above the risk-neutral strategy. Your suggested bid is $${suggestedBid.toFixed(2)} (about ${(suggestedBid / v * 100).toFixed(1)}% of your $${v} valuation). Risk aversion means you value winning more highly and are willing to sacrifice some profit margin to increase your winning probability. This conservative approach reduces the chance of losing to aggressive competitors.`;
    } else if (riskAttitude === 'seeking') {
      suggestedBid = baseBid * 0.9; // Bid slightly lower
      explanation = `As a risk-seeking bidder in a sealed-bid auction with ${n} competitors, you should bid below the risk-neutral strategy to maximize potential profit. Your suggested bid is $${suggestedBid.toFixed(2)} (about ${(suggestedBid / v * 100).toFixed(1)}% of your $${v} valuation). This aggressive strategy accepts lower winning probability in exchange for higher profit margins when you do win. It's optimal when you have multiple bidding opportunities or can afford to lose this particular auction.`;
    } else {
      suggestedBid = baseBid;
      explanation = `As a risk-neutral bidder in a sealed-bid auction with ${n} competitors, your optimal bid is $${suggestedBid.toFixed(2)} (${((n - 1) / n * 100).toFixed(1)}% of your $${v} valuation). This strategy maximizes expected profit by balancing winning probability against profit margin. It assumes you're indifferent between certain outcomes and risky prospects with the same expected value, which is standard in competitive business settings with repeated opportunities.`;
    }

    setResult({ suggestedBid, explanation });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="numBidders">Number of Bidders</Label>
          <Input
            id="numBidders"
            type="number"
            min="2"
            value={numBidders}
            onChange={(e) => setNumBidders(e.target.value)}
            placeholder="e.g., 3"
          />
        </div>
        <div>
          <Label htmlFor="privateValue">Your Private Value ($)</Label>
          <Input
            id="privateValue"
            type="number"
            min="0"
            step="0.01"
            value={privateValue}
            onChange={(e) => setPrivateValue(e.target.value)}
            placeholder="e.g., 100"
          />
        </div>
        <div>
          <Label htmlFor="riskAttitude">Risk Attitude</Label>
          <Select value={riskAttitude} onValueChange={setRiskAttitude}>
            <SelectTrigger id="riskAttitude">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neutral">Risk Neutral</SelectItem>
              <SelectItem value="averse">Risk Averse</SelectItem>
              <SelectItem value="seeking">Risk Seeking</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={calculateBid} className="w-full md:w-auto">
        <Calculator className="mr-2 h-4 w-4" />
        Calculate Optimal Bid
      </Button>

      {result && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Recommended Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Suggested Bid</p>
              <p className="text-3xl font-bold text-primary">${result.suggestedBid.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Explanation</p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <ModelAssumptionsNote
        assumptions={[
          'Sealed-bid format where bids are submitted simultaneously',
          'Independent private valuations across bidders',
          'Risk attitude affects optimal bidding strategy',
          'Simplified model assumes symmetric equilibrium',
        ]}
      />
    </div>
  );
}
