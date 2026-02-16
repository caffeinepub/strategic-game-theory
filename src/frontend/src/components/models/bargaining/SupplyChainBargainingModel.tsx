import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ModelAssumptionsNote from '../ModelAssumptionsNote';
import { Calculator } from 'lucide-react';

export default function SupplyChainBargainingModel() {
  const [totalSurplus, setTotalSurplus] = useState<string>('100');
  const [disagreementPayoff1, setDisagreementPayoff1] = useState<string>('10');
  const [disagreementPayoff2, setDisagreementPayoff2] = useState<string>('10');
  const [bargainingPower1, setBargainingPower1] = useState<string>('0.5');
  const [result, setResult] = useState<{
    split1: number;
    split2: number;
    explanation: string;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const calculateSplit = () => {
    setError('');
    const S = parseFloat(totalSurplus);
    const d1 = parseFloat(disagreementPayoff1);
    const d2 = parseFloat(disagreementPayoff2);
    const alpha = parseFloat(bargainingPower1);

    if (isNaN(S) || S <= 0) {
      setError('Total surplus must be positive');
      return;
    }
    if (isNaN(d1) || isNaN(d2)) {
      setError('Disagreement payoffs must be valid numbers');
      return;
    }
    if (d1 + d2 > S) {
      setError('Sum of disagreement payoffs cannot exceed total surplus');
      return;
    }
    if (isNaN(alpha) || alpha < 0 || alpha > 1) {
      setError('Bargaining power must be between 0 and 1');
      return;
    }

    // Nash bargaining solution: maximize (u1 - d1)^alpha * (u2 - d2)^(1-alpha)
    // Subject to u1 + u2 = S
    // Solution: u1 = d1 + alpha * (S - d1 - d2), u2 = d2 + (1-alpha) * (S - d1 - d2)
    const surplus = S - d1 - d2;
    const split1 = d1 + alpha * surplus;
    const split2 = d2 + (1 - alpha) * surplus;

    const explanation = `Using the Nash bargaining solution with bargaining powers ${(alpha * 100).toFixed(0)}% and ${((1 - alpha) * 100).toFixed(0)}%, the optimal agreement allocates $${split1.toFixed(2)} to Party 1 and $${split2.toFixed(2)} to Party 2. This split maximizes the product of gains above disagreement payoffs, weighted by bargaining power. Party 1 gains $${(split1 - d1).toFixed(2)} above their disagreement point, while Party 2 gains $${(split2 - d2).toFixed(2)}. This solution is efficient (uses all surplus) and fair (respects relative bargaining power).`;

    setResult({ split1, split2, explanation });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nash Bargaining Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalSurplus">Total Surplus to Split ($)</Label>
              <Input
                id="totalSurplus"
                type="number"
                min="0"
                step="0.01"
                value={totalSurplus}
                onChange={(e) => setTotalSurplus(e.target.value)}
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <Label htmlFor="bargainingPower1">Party 1 Bargaining Power (0-1)</Label>
              <Input
                id="bargainingPower1"
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={bargainingPower1}
                onChange={(e) => setBargainingPower1(e.target.value)}
                placeholder="e.g., 0.5"
              />
            </div>
            <div>
              <Label htmlFor="disagreementPayoff1">Party 1 Disagreement Payoff ($)</Label>
              <Input
                id="disagreementPayoff1"
                type="number"
                step="0.01"
                value={disagreementPayoff1}
                onChange={(e) => setDisagreementPayoff1(e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <Label htmlFor="disagreementPayoff2">Party 2 Disagreement Payoff ($)</Label>
              <Input
                id="disagreementPayoff2"
                type="number"
                step="0.01"
                value={disagreementPayoff2}
                onChange={(e) => setDisagreementPayoff2(e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={calculateSplit} className="w-full md:w-auto">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Optimal Split
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Recommended Agreement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Party 1 Allocation</p>
                <p className="text-3xl font-bold text-primary">${result.split1.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Party 2 Allocation</p>
                <p className="text-3xl font-bold text-primary">${result.split2.toFixed(2)}</p>
              </div>
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
          'Parties can negotiate and make binding agreements',
          'Disagreement payoffs are known and credible',
          'Bargaining power reflects relative patience, alternatives, or negotiation skill',
          'Solution maximizes weighted product of gains above disagreement',
        ]}
      />
    </div>
  );
}
