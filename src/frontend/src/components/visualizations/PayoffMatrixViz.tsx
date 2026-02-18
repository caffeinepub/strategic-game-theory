import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Support both naming conventions for backward compatibility
interface PayoffOld {
  player1: number;
  player2: number;
}

interface PayoffNew {
  p1: number;
  p2: number;
}

type Payoff = PayoffOld | PayoffNew;

interface PayoffMatrix {
  enterEnter: Payoff;
  enterStayOut: Payoff;
  stayOutEnter: Payoff;
  stayOutStayOut: Payoff;
}

interface PayoffMatrixVizProps {
  payoffs: PayoffMatrix;
  equilibria: string[];
  highlightedOutcome?: {
    p1Action: 'enter' | 'stay-out';
    p2Action: 'enter' | 'stay-out';
  };
}

// Helper to normalize payoff to consistent format
function getPayoffValues(payoff: Payoff): { p1: number; p2: number } {
  if ('p1' in payoff) {
    return { p1: payoff.p1, p2: payoff.p2 };
  } else {
    return { p1: payoff.player1, p2: payoff.player2 };
  }
}

export default function PayoffMatrixViz({ payoffs, equilibria, highlightedOutcome }: PayoffMatrixVizProps) {
  const isEquilibrium = (p1Action: string, p2Action: string) => {
    const eqString = `(${p1Action}, ${p2Action})`;
    return equilibria.includes(eqString);
  };

  const isHighlighted = (p1Action: 'enter' | 'stay-out', p2Action: 'enter' | 'stay-out') => {
    if (!highlightedOutcome) return false;
    return highlightedOutcome.p1Action === p1Action && highlightedOutcome.p2Action === p2Action;
  };

  const getCellClass = (p1Action: 'enter' | 'stay-out', p2Action: 'enter' | 'stay-out') => {
    const p1Label = p1Action === 'enter' ? 'Enter' : 'Stay Out';
    const p2Label = p2Action === 'enter' ? 'Enter' : 'Stay Out';
    const isEq = isEquilibrium(p1Label, p2Label);
    const isHl = isHighlighted(p1Action, p2Action);

    if (isHl && isEq) {
      return 'bg-primary/30 border-primary border-4';
    } else if (isHl) {
      return 'bg-accent/30 border-accent border-4';
    } else if (isEq) {
      return 'bg-primary/20 border-primary border-2';
    }
    return 'bg-muted/30 border';
  };

  const enterEnter = getPayoffValues(payoffs.enterEnter);
  const enterStayOut = getPayoffValues(payoffs.enterStayOut);
  const stayOutEnter = getPayoffValues(payoffs.stayOutEnter);
  const stayOutStayOut = getPayoffValues(payoffs.stayOutStayOut);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Payoff Matrix Visualization</CardTitle>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <Badge variant="outline" className="bg-primary/20 border-primary">
            Nash Equilibrium
          </Badge>
          {highlightedOutcome && (
            <Badge variant="outline" className="bg-accent/30 border-accent">
              Current Outcome
            </Badge>
          )}
          <span className="text-muted-foreground">Highlighted cells show equilibrium outcomes</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2"></th>
                <th className="border p-3 bg-muted/50 font-semibold">Player 2: Enter</th>
                <th className="border p-3 bg-muted/50 font-semibold">Player 2: Stay Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3 bg-muted/50 font-semibold">Player 1: Enter</td>
                <td className={`border p-4 text-center ${getCellClass('enter', 'enter')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{enterEnter.p1}</div>
                    <div className="text-muted-foreground">{enterEnter.p2}</div>
                  </div>
                </td>
                <td className={`border p-4 text-center ${getCellClass('enter', 'stay-out')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{enterStayOut.p1}</div>
                    <div className="text-muted-foreground">{enterStayOut.p2}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border p-3 bg-muted/50 font-semibold">Player 1: Stay Out</td>
                <td className={`border p-4 text-center ${getCellClass('stay-out', 'enter')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{stayOutEnter.p1}</div>
                    <div className="text-muted-foreground">{stayOutEnter.p2}</div>
                  </div>
                </td>
                <td className={`border p-4 text-center ${getCellClass('stay-out', 'stay-out')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{stayOutStayOut.p1}</div>
                    <div className="text-muted-foreground">{stayOutStayOut.p2}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold">Reading the matrix:</span> Each cell shows (Player 1 payoff, Player 2
            payoff). Highlighted cells indicate Nash equilibria where neither player wants to deviate.
            {highlightedOutcome && ' The current outcome is shown with a distinct highlight.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
