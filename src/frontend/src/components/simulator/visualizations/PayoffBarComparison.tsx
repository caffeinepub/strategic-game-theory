interface PayoffBarComparisonProps {
  player1Payoff: number;
  player2Payoff: number;
}

export default function PayoffBarComparison({ player1Payoff, player2Payoff }: PayoffBarComparisonProps) {
  const maxPayoff = Math.max(Math.abs(player1Payoff), Math.abs(player2Payoff), 1);
  const p1Width = (Math.abs(player1Payoff) / maxPayoff) * 100;
  const p2Width = (Math.abs(player2Payoff) / maxPayoff) * 100;

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h4 className="font-semibold mb-4">Payoff Comparison</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Player 1</span>
            <span className="text-muted-foreground">{player1Payoff.toFixed(2)}</span>
          </div>
          <div className="h-8 bg-muted rounded overflow-hidden">
            <div
              className="h-full bg-primary flex items-center justify-end px-2 text-primary-foreground text-xs font-semibold transition-all"
              style={{ width: `${p1Width}%` }}
            >
              {p1Width > 20 && player1Payoff.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Player 2</span>
            <span className="text-muted-foreground">{player2Payoff.toFixed(2)}</span>
          </div>
          <div className="h-8 bg-muted rounded overflow-hidden">
            <div
              className="h-full bg-secondary flex items-center justify-end px-2 text-secondary-foreground text-xs font-semibold transition-all"
              style={{ width: `${p2Width}%` }}
            >
              {p2Width > 20 && player2Payoff.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
