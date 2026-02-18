interface RoundResult {
  player1Payoff: number;
  player2Payoff: number;
}

interface PayoffTrendLineChartProps {
  results: RoundResult[];
}

export default function PayoffTrendLineChart({ results }: PayoffTrendLineChartProps) {
  if (results.length === 0) return null;

  const cumulativeP1 = results.reduce((acc, r, idx) => {
    acc.push((acc[idx - 1] || 0) + r.player1Payoff);
    return acc;
  }, [] as number[]);

  const cumulativeP2 = results.reduce((acc, r, idx) => {
    acc.push((acc[idx - 1] || 0) + r.player2Payoff);
    return acc;
  }, [] as number[]);

  const maxCumulative = Math.max(...cumulativeP1, ...cumulativeP2, 1);
  const minCumulative = Math.min(...cumulativeP1, ...cumulativeP2, 0);
  const range = maxCumulative - minCumulative || 1;

  const chartHeight = 200;
  const chartWidth = 600;
  const padding = 40;

  const getX = (index: number) => padding + (index / (results.length - 1 || 1)) * (chartWidth - 2 * padding);
  const getY = (value: number) => chartHeight - padding - ((value - minCumulative) / range) * (chartHeight - 2 * padding);

  const p1Points = cumulativeP1.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' ');
  const p2Points = cumulativeP2.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' ');

  return (
    <div className="p-6 border rounded-lg bg-card">
      <h4 className="font-semibold mb-4">Cumulative Payoffs Over Rounds</h4>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ maxWidth: '600px' }}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
            const y = chartHeight - padding - fraction * (chartHeight - 2 * padding);
            return (
              <line
                key={fraction}
                x1={padding}
                y1={y}
                x2={chartWidth - padding}
                y2={y}
                stroke="oklch(var(--border))"
                strokeWidth="1"
                strokeDasharray="4"
              />
            );
          })}

          {/* Axes */}
          <line
            x1={padding}
            y1={chartHeight - padding}
            x2={chartWidth - padding}
            y2={chartHeight - padding}
            stroke="oklch(var(--foreground))"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight - padding}
            stroke="oklch(var(--foreground))"
            strokeWidth="2"
          />

          {/* Player 1 line */}
          <polyline points={p1Points} fill="none" stroke="oklch(var(--primary))" strokeWidth="3" />

          {/* Player 2 line */}
          <polyline points={p2Points} fill="none" stroke="oklch(var(--secondary))" strokeWidth="3" />

          {/* Data points */}
          {cumulativeP1.map((val, idx) => (
            <circle key={`p1-${idx}`} cx={getX(idx)} cy={getY(val)} r="4" fill="oklch(var(--primary))" />
          ))}
          {cumulativeP2.map((val, idx) => (
            <circle key={`p2-${idx}`} cx={getX(idx)} cy={getY(val)} r="4" fill="oklch(var(--secondary))" />
          ))}

          {/* Labels */}
          <text x={chartWidth / 2} y={chartHeight - 5} textAnchor="middle" fontSize="12" fill="oklch(var(--foreground))">
            Round
          </text>
          <text
            x={10}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="12"
            fill="oklch(var(--foreground))"
            transform={`rotate(-90, 10, ${chartHeight / 2})`}
          >
            Cumulative Payoff
          </text>
        </svg>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'oklch(var(--primary))' }} />
          <span>Player 1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'oklch(var(--secondary))' }} />
          <span>Player 2</span>
        </div>
      </div>
    </div>
  );
}
