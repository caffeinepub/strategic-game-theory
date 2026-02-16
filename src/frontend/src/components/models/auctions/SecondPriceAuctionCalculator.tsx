import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ModelAssumptionsNote from '../ModelAssumptionsNote';
import { Calculator } from 'lucide-react';

export default function SecondPriceAuctionCalculator() {
  const [numBidders, setNumBidders] = useState<string>('3');
  const [privateValue, setPrivateValue] = useState<string>('100');
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

    // In second-price auctions, truthful bidding is dominant
    const suggestedBid = v;

    const explanation = `In a second-price (Vickrey) auction, bidding your true valuation is a dominant strategy. You should bid exactly $${suggestedBid.toFixed(2)}. Here's why: If you win, you pay the second-highest bid (not your own), so overbidding risks winning when you shouldn't, and underbidding risks losing when you should win. Truthful bidding maximizes your expected utility regardless of what others bid. This elegant property makes second-price auctions strategy-proof and efficient.`;

    setResult({ suggestedBid, explanation });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <p className="text-sm text-muted-foreground mb-1">Suggested Bid (Dominant Strategy)</p>
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
          'Winner pays the second-highest bid (Vickrey auction rules)',
          'Bidders have independent private valuations',
          'Truthful bidding is a weakly dominant strategy for all bidders',
          'The auction allocates the item efficiently to the highest-value bidder',
        ]}
      />
    </div>
  );
}
