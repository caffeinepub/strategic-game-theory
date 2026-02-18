import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Gamepad2, Gavel, TrendingUp, Handshake } from 'lucide-react';

export default function SimulatorPage() {
  const navigate = useNavigate();

  const games = [
    {
      id: 'prisoners-dilemma',
      title: "Prisoner's Dilemma",
      description: 'Explore cooperation vs. defection in single and repeated rounds',
      icon: Gamepad2,
      path: '/simulator/prisoners-dilemma',
      features: ['Single & Repeated Rounds', 'Player vs Player', 'Player vs Computer', 'Nash Equilibrium Analysis'],
    },
    {
      id: 'auction-bidding',
      title: 'Auction Bidding',
      description: 'Learn optimal bidding strategies in first-price and second-price auctions',
      icon: Gavel,
      path: '/simulator/auction-bidding',
      features: ['First-Price Auctions', 'Second-Price Auctions', 'Truthful Bidding', 'Strategic Shading'],
    },
    {
      id: 'market-entry',
      title: 'Market Entry',
      description: 'Analyze strategic decisions in competitive market entry scenarios',
      icon: TrendingUp,
      path: '/simulator/market-entry',
      features: ['Enter vs Stay Out', 'Payoff Matrix', 'Equilibrium Detection', 'Strategic Recommendations'],
    },
    {
      id: 'supply-chain-bargaining',
      title: 'Supply Chain Bargaining',
      description: 'Negotiate optimal splits in supply chain partnerships',
      icon: Handshake,
      path: '/simulator/supply-chain-bargaining',
      features: ['Nash Bargaining', 'Bargaining Power', 'Disagreement Points', 'Cooperative Outcomes'],
    },
  ];

  return (
    <PageLayout
      title="Interactive Game Theory Simulator"
      description="Experience strategic decision-making through playable simulations. Choose your strategies, compete against the computer or another player, and learn from instant feedback."
    >
      <div className="space-y-8">
        {/* Overview Section */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Simulator</CardTitle>
            <CardDescription>
              Each game module allows you to make strategic decisions and see the outcomes in real-time. You can play
              against the computer with different behavior settings, or play with another person on the same device.
              After each round, you'll receive detailed feedback explaining the results and strategic insights.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Game Selection Tabs */}
        <Tabs defaultValue="prisoners-dilemma" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {games.map((game) => (
              <TabsTrigger key={game.id} value={game.id}>
                <game.icon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{game.title}</span>
                <span className="sm:hidden">{game.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {games.map((game) => (
            <TabsContent key={game.id} value={game.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2">
                        <game.icon className="h-6 w-6 text-primary" />
                        {game.title}
                      </CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </div>
                    <Button onClick={() => navigate({ to: game.path })}>Play Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {game.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Learning Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Understand Strategic Interdependence</h4>
                <p className="text-sm text-muted-foreground">
                  Learn how your decisions affect others and how their decisions affect you
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Identify Nash Equilibria</h4>
                <p className="text-sm text-muted-foreground">
                  Recognize stable outcomes where no player wants to change their strategy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Apply to Business Decisions</h4>
                <p className="text-sm text-muted-foreground">
                  Connect game theory concepts to real-world pricing, negotiation, and competitive strategy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
