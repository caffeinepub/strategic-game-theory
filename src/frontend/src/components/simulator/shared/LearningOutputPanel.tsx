import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Info } from 'lucide-react';
import { LearningOutput } from './learningOutputTypes';

interface LearningOutputPanelProps {
  output: LearningOutput;
}

export default function LearningOutputPanel({ output }: LearningOutputPanelProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Round Results & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Strategies and Payoffs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Player 1</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{output.strategies.player1}</Badge>
              <span className="text-sm text-muted-foreground">Payoff: {output.payoffs.player1}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Player 2</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{output.strategies.player2}</Badge>
              <span className="text-sm text-muted-foreground">Payoff: {output.payoffs.player2}</span>
            </div>
          </div>
        </div>

        {/* Equilibrium Status */}
        {output.equilibrium && (
          <Alert className={output.equilibrium.isEquilibrium ? 'border-primary bg-primary/5' : ''}>
            <AlertDescription className="space-y-2">
              <div className="flex items-center gap-2">
                {output.equilibrium.isEquilibrium && <CheckCircle2 className="h-4 w-4 text-primary" />}
                <span className="font-semibold">
                  {output.equilibrium.isEquilibrium ? 'Nash Equilibrium' : 'Not an Equilibrium'}
                </span>
              </div>
              <p className="text-sm">{output.equilibrium.explanation}</p>
              {output.equilibrium.allEquilibria.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium">All equilibria: </span>
                  {output.equilibrium.allEquilibria.join(', ')}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Explanation Sections */}
        <div className="space-y-3">
          <h4 className="font-semibold">{output.explanation.title}</h4>
          {output.explanation.sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h5 className="font-medium text-sm text-primary">{section.heading}</h5>
              <p className="text-sm text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
