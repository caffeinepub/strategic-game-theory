import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Payoff {
  player1: number;
  player2: number;
}

interface PayoffMatrix {
  enterEnter: Payoff;
  enterStayOut: Payoff;
  stayOutEnter: Payoff;
  stayOutStayOut: Payoff;
}

interface PayoffMatrixVizProps {
  payoffs: PayoffMatrix;
  equilibria: string[];
}

export default function PayoffMatrixViz({ payoffs, equilibria }: PayoffMatrixVizProps) {
  const isEquilibrium = (p1Action: string, p2Action: string) => {
    const eqString = `(${p1Action}, ${p2Action})`;
    return equilibria.includes(eqString);
  };

  const getCellClass = (p1Action: string, p2Action: string) => {
    if (isEquilibrium(p1Action, p2Action)) {
      return 'bg-primary/20 border-primary border-2';
    }
    return 'bg-muted/30 border';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Payoff Matrix Visualization</CardTitle>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline" className="bg-primary/20 border-primary">
            Nash Equilibrium
          </Badge>
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
                <td className={`border p-4 text-center ${getCellClass('Enter', 'Enter')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{payoffs.enterEnter.player1}</div>
                    <div className="text-muted-foreground">{payoffs.enterEnter.player2}</div>
                  </div>
                </td>
                <td className={`border p-4 text-center ${getCellClass('Enter', 'Stay Out')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{payoffs.enterStayOut.player1}</div>
                    <div className="text-muted-foreground">{payoffs.enterStayOut.player2}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border p-3 bg-muted/50 font-semibold">Player 1: Stay Out</td>
                <td className={`border p-4 text-center ${getCellClass('Stay Out', 'Enter')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{payoffs.stayOutEnter.player1}</div>
                    <div className="text-muted-foreground">{payoffs.stayOutEnter.player2}</div>
                  </div>
                </td>
                <td className={`border p-4 text-center ${getCellClass('Stay Out', 'Stay Out')}`}>
                  <div className="font-mono text-sm">
                    <div className="font-semibold text-primary">{payoffs.stayOutStayOut.player1}</div>
                    <div className="text-muted-foreground">{payoffs.stayOutStayOut.player2}</div>
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
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
