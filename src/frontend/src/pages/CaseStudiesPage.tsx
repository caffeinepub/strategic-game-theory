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
      relatedModel: 'auctions',
    },
    {
      id: 'airline-entry',
      title: 'Low-Cost Carrier Market Entry',
      category: 'Market Entry',
      context:
        'A low-cost airline considers entering a route dominated by an established carrier. The incumbent can respond with aggressive pricing or capacity expansion.',
      players: 'Entrant (low-cost carrier) and Incumbent (established airline)',
      strategies:
        'Entrant: Enter with low prices or stay out. Incumbent: Accommodate entry with moderate response or fight with predatory pricing',
      analysis: [
        'Construct payoff matrix: If entrant stays out, incumbent earns monopoly profits ($100M), entrant earns $0',
        'If entrant enters and incumbent accommodates: both earn moderate profits (Entrant: $30M, Incumbent: $60M)',
        'If entrant enters and incumbent fights: both lose money (Entrant: -$20M, Incumbent: $20M)',
        'Identify Nash equilibrium: (Enter, Accommodate) is the unique equilibrium',
        'Incumbent\'s threat to fight is not credible—once entry occurs, accommodation is more profitable',
      ],
      conclusion:
        'The entrant should enter the market. Although the incumbent may threaten aggressive response, this threat is not credible because accommodation is more profitable after entry occurs. This demonstrates the importance of subgame perfection and credible commitments in sequential games. The entrant can safely enter, expecting the incumbent to accommodate.',
      relatedModel: 'market-entry',
    },
    {
      id: 'supplier-negotiation',
      title: 'Automotive Supply Chain Negotiation',
      category: 'Bargaining',
      context:
        'An automotive manufacturer negotiates with a specialized parts supplier over a long-term contract. Both parties have alternatives but prefer to work together.',
      players: 'Manufacturer and Supplier',
      strategies: 'Negotiate contract terms including price, volume commitments, and quality standards',
      analysis: [
        'Identify disagreement payoffs: Manufacturer can source from alternative supplier at higher cost ($40M profit), Supplier can sell to other manufacturers ($30M profit)',
        'Calculate total surplus from cooperation: Joint profits of $120M if they work together',
        'Surplus to split: $120M - $40M - $30M = $50M above disagreement points',
        'Assess bargaining power: Manufacturer has slightly more alternatives (60% power)',
        'Apply Nash bargaining solution: Manufacturer gets $40M + 0.6($50M) = $70M, Supplier gets $30M + 0.4($50M) = $50M',
      ],
      conclusion:
        'The optimal contract allocates $70M to the manufacturer and $50M to the supplier. This split reflects their relative bargaining power while ensuring both parties gain substantially from cooperation. The manufacturer\'s stronger alternatives justify a larger share of the surplus. Both parties should accept this agreement as it makes them significantly better off than their alternatives.',
      relatedModel: 'bargaining',
    },
  ];

  return (
    <PageLayout
      title="Case Studies"
      description="Explore real-world business scenarios analyzed through the lens of game theory. See how strategic thinking leads to better decisions."
    >
      <div className="space-y-6">
        {caseStudies.map((study) => (
          <Card key={study.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                  <CardDescription className="text-base">{study.category}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="context" className="border-b">
                  <AccordionTrigger className="text-base font-semibold">Context</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">{study.context}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="players" className="border-b">
                  <AccordionTrigger className="text-base font-semibold">Players & Strategies</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Players:</span> {study.players}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">Strategies:</span> {study.strategies}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="analysis" className="border-b">
                  <AccordionTrigger className="text-base font-semibold">Step-by-Step Analysis</AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <ol className="list-decimal list-inside space-y-2">
                      {study.analysis.map((step, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="conclusion" className="border-b-0">
                  <AccordionTrigger className="text-base font-semibold">Conclusion & Recommendation</AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <p className="text-muted-foreground mb-4">{study.conclusion}</p>
                    {study.relatedModel && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate({ to: '/models' })}
                        className="mt-2"
                      >
                        Try the {study.category} Model
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
