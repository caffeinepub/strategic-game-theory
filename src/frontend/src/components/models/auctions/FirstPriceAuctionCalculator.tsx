import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ModelAssumptionsNote from '../ModelAssumptionsNote';
import { Calculator } from 'lucide-react';

export default function FirstPriceAuctionCalculator() {
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

    // Simplified first-price auction strategy: bid (n-1)/n of your value
    const suggestedBid = v * ((n - 1) / n);

    const explanation = `In a first-price sealed-bid auction with ${n} bidders, the optimal strategy under symmetric independent private values is to bid a fraction of your true value. With ${n} bidders, you should bid approximately ${((n - 1) / n * 100).toFixed(1)}% of your valuation, which is $${suggestedBid.toFixed(2)}. This balances the trade-off between winning probability and profit margin. Bidding your full value ($${v}) would guarantee zero profit if you win, while bidding too low reduces your chance of winning.`;

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
          'All bidders have independent private valuations drawn from the same distribution',
          'Bidders are risk-neutral and seek to maximize expected profit',
          'Valuations are uniformly distributed (simplified model)',
          'All bidders use the same equilibrium strategy',
        ]}
      />
    </div>
  );
}
