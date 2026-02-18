import { useNavigate } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CaseStudiesPage() {
  const navigate = useNavigate();

  const caseStudies = [
    {
      id: 'spectrum-auction',
      title: 'FCC Spectrum Auction Strategy',
      category: 'Auction Theory',
      context:
        'The Federal Communications Commission (FCC) conducts auctions for wireless spectrum licenses. Telecom companies must bid strategically for valuable frequency bands.',
      players: 'Major telecom carriers (Verizon, AT&T, T-Mobile) competing for spectrum licenses',
      strategies: 'Bidding strategies include: aggressive bidding for key markets, defensive bidding to block competitors, and portfolio bidding for complementary licenses',
      analysis: [
        'Identify private valuations based on existing network coverage and strategic importance',
        'Recognize the auction format (simultaneous ascending auction) creates interdependencies between licenses',
        'Consider the exposure problem: winning some licenses without complementary ones reduces value',
        'Account for the winner\'s curse: winning bidders may have overestimated value',
        'Evaluate competitors\' likely valuations and budget constraints',
      ],
      conclusion:
        'Optimal strategy combines truthful bidding on must-have licenses with strategic demand reduction on less critical ones. Companies should bid up to their true value on core markets but avoid getting drawn into bidding wars for marginal licenses. The simultaneous format requires sophisticated portfolio management.',
      simulatorPath: '/simulator/auction-bidding',
    },
    {
      id: 'airline-entry',
      title: 'Low-Cost Carrier Market Entry',
      category: 'Market Entry',
      context:
        'A low-cost airline considers entering a route dominated by an established carrier. The incumbent can respond with aggressive pricing or capacity expansion.',
      players: 'Entrant (low-cost carrier) and Incumbent (established airline)',
      strategies:
        'Entrant: Enter or Stay Out. Incumbent: Accommodate (maintain prices) or Fight (price war/capacity increase)',
      analysis: [
        'Construct the game tree with the entrant moving first (entry decision)',
        'Identify the incumbent\'s credible responses to entry',
        'Calculate payoffs considering entry costs, market size, and competitive intensity',
        'Use backward induction to find the subgame perfect equilibrium',
        'Assess whether the incumbent\'s threat to fight is credible given the costs',
      ],
      conclusion:
        'If fighting is costly for the incumbent, the threat to fight is not credible. The entrant should enter, anticipating accommodation. However, if the incumbent has a reputation for fighting or can commit to aggressive response (e.g., through capacity expansion), entry may be deterred. The key is distinguishing credible commitments from empty threats.',
      simulatorPath: '/simulator/market-entry',
    },
    {
      id: 'supply-chain',
      title: 'Supplier-Manufacturer Negotiation',
      category: 'Bargaining',
      context:
        'A manufacturer negotiates with a key supplier over the division of surplus from a long-term contract. Both parties have outside options but prefer to reach an agreement.',
      players: 'Supplier and Manufacturer negotiating contract terms',
      strategies: 'Each party proposes a division of the total surplus, considering their bargaining power and alternatives',
      analysis: [
        'Identify the total surplus created by the partnership',
        'Determine each party\'s disagreement payoff (value of outside options)',
        'Assess relative bargaining power based on alternatives, switching costs, and market conditions',
        'Apply the Nash bargaining solution to predict the outcome',
        'Consider how relationship-specific investments affect bargaining positions',
      ],
      conclusion:
        'The Nash bargaining solution predicts that surplus will be divided based on relative bargaining power and outside options. Parties with better alternatives capture more surplus. Relationship-specific investments can create hold-up problems, reducing investment incentives. Long-term contracts and reputation effects can mitigate these issues.',
      simulatorPath: '/simulator/supply-chain-bargaining',
    },
  ];

  return (
    <PageLayout
      title="Case Studies"
      description="Real-world applications of game theory in business strategy. Learn from detailed analyses of strategic situations."
    >
      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>How to Use These Case Studies</CardTitle>
            <CardDescription>
              Each case study presents a real business scenario, analyzes the strategic situation using game theory, and
              provides actionable insights. After reading, try the related simulator to experiment with different strategies.
            </CardDescription>
          </CardHeader>
        </Card>

        <Accordion type="single" collapsible className="space-y-4">
          {caseStudies.map((study) => (
            <AccordionItem key={study.id} value={study.id} className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start text-left">
                  <h3 className="text-xl font-semibold">{study.title}</h3>
                  <span className="text-sm text-muted-foreground mt-1">{study.category}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <h4 className="font-semibold mb-2">Context</h4>
                  <p className="text-muted-foreground">{study.context}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Players</h4>
                  <p className="text-muted-foreground">{study.players}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Strategies</h4>
                  <p className="text-muted-foreground">{study.strategies}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Game-Theoretic Analysis</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {study.analysis.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Strategic Insights</h4>
                  <p className="text-muted-foreground">{study.conclusion}</p>
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={() => navigate({ to: study.simulatorPath })} className="w-full sm:w-auto">
                    Try in Simulator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageLayout>
  );
}
