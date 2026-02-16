import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AboutGameTheoryPage() {
  const concepts = [
    {
      id: 'players',
      title: 'Players',
      definition:
        'Players are the decision-makers in a game. Each player has their own objectives and makes strategic choices to maximize their outcomes.',
      example:
        'In a pricing competition, two smartphone manufacturers (Apple and Samsung) are the players. Each must decide on pricing strategies without knowing the other\'s exact move, but anticipating their competitor\'s likely response.',
    },
    {
      id: 'strategies',
      title: 'Strategies',
      definition:
        'A strategy is a complete plan of action that specifies what a player will do in every possible situation. Strategies can be pure (a single definite action) or mixed (probabilistic combinations).',
      example:
        'In market entry, a firm\'s strategies might include "Enter aggressively with low prices," "Enter cautiously with premium positioning," or "Stay out of the market." Each strategy leads to different outcomes depending on competitors\' choices.',
    },
    {
      id: 'payoffs',
      title: 'Payoffs',
      definition:
        'Payoffs represent the outcomes or rewards that players receive based on the combination of strategies chosen by all players. Payoffs can be profits, market share, utility, or any measurable outcome.',
      example:
        'In a supply chain negotiation between a manufacturer and retailer, payoffs might be measured in profit margins. If both cooperate on fair terms, each earns $50M. If one exploits the other, the exploiter gains $70M while the other loses $20M.',
    },
    {
      id: 'nash-equilibrium',
      title: 'Nash Equilibrium',
      definition:
        'A Nash equilibrium is a set of strategies where no player can improve their payoff by unilaterally changing their strategy, given the strategies of other players. It represents a stable outcome.',
      example:
        'In the classic Prisoner\'s Dilemma applied to business, two firms deciding whether to advertise heavily reach a Nash equilibrium where both advertise. Neither can improve by stopping ads alone, even though both would be better off if neither advertised.',
    },
    {
      id: 'dominant-strategy',
      title: 'Dominant Strategy',
      definition:
        'A dominant strategy is one that yields a better payoff than any other strategy, regardless of what other players do. If a player has a dominant strategy, they should always play it.',
      example:
        'In a second-price sealed-bid auction, bidding your true valuation is a dominant strategy. Regardless of what others bid, you maximize your expected payoff by bidding truthfully—you never benefit from overbidding or underbidding.',
    },
    {
      id: 'mixed-strategies',
      title: 'Mixed Strategies',
      definition:
        'Mixed strategies involve randomizing over multiple pure strategies according to specific probabilities. They are used when no pure strategy equilibrium exists or when unpredictability is valuable.',
      example:
        'In competitive sports marketing, a company might randomly vary its promotional timing (60% early season, 40% late season) to keep competitors uncertain and prevent them from perfectly timing counter-promotions.',
    },
    {
      id: 'repeated-games',
      title: 'Repeated Games',
      definition:
        'Repeated games occur when the same strategic interaction happens multiple times. Players can condition their current actions on past behavior, enabling cooperation through reputation and punishment mechanisms.',
      example:
        'Long-term supplier relationships exemplify repeated games. A supplier might maintain quality standards because they know that cutting corners today will damage the relationship and future profits. The threat of losing future business sustains cooperation.',
    },
  ];

  return (
    <PageLayout
      title="About Game Theory"
      description="Game theory provides a mathematical framework for analyzing strategic interactions where the outcome for each participant depends on the actions of all. Learn the fundamental concepts that power strategic business decision-making."
    >
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Why Game Theory Matters in Business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              In today's competitive business environment, success often depends on anticipating and responding to the
              actions of competitors, partners, and customers. Game theory provides the analytical tools to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Predict competitor behavior and market dynamics</li>
              <li>Design optimal pricing and bidding strategies</li>
              <li>Structure negotiations and partnerships for mutual benefit</li>
              <li>Understand when cooperation or competition is the better strategy</li>
              <li>Make better decisions under uncertainty and strategic interdependence</li>
            </ul>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Core Concepts</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {concepts.map((concept) => (
            <AccordionItem key={concept.id} value={concept.id} className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {concept.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <h4 className="font-semibold mb-2">Definition</h4>
                  <p className="text-muted-foreground">{concept.definition}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Business Example</h4>
                  <p className="text-muted-foreground">{concept.example}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageLayout>
  );
}
