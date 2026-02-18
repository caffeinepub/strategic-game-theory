import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Target, TrendingUp, Users, Handshake } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Strategic Decision Making',
      description: 'Learn how to analyze competitive scenarios and make optimal strategic choices.',
    },
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'Understand market entry, pricing competition, and competitive dynamics.',
    },
    {
      icon: Users,
      title: 'Auction Theory',
      description: 'Master bidding strategies for first-price, second-price, and sealed-bid auctions.',
    },
    {
      icon: Handshake,
      title: 'Negotiation Frameworks',
      description: 'Optimize supply chain bargaining and cooperative agreements.',
    },
  ];

  return (
    <div className="relative">
      {/* Creator Credit Banner */}
      <section className="w-full bg-primary/5 border-b border-primary/10 py-4">
        <div className="container">
          <div className="text-center">
            <p className="text-sm md:text-base text-muted-foreground font-medium">Created by:</p>
            <p className="text-base md:text-lg font-semibold text-foreground mt-1">
              Albin B Tom and Nikita Maria Bino
            </p>
            <p className="text-sm md:text-base text-muted-foreground">6 BBA SBA B</p>
            <p className="text-sm md:text-base text-muted-foreground">of Christ University, Yeshwanthpur</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/bg-pattern.dim_1600x1600.png)',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Game Theory for Strategic Business Decisions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Develop game-theoretic frameworks that address strategic business challenges. Learn how game theory helps
              organizations make optimal competitive and cooperative decisions through analytical tools and
              interactive simulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/simulator' })} className="text-lg px-8">
                Play Interactive Game
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/resources' })} className="text-lg px-8">
                Start Learning
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/case-studies' })} className="text-lg px-8">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master the fundamental concepts and applications of game theory in business strategy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-4xl mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Explore interactive simulations, analyze real-world case studies, and test your understanding with our
                comprehensive learning resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate({ to: '/about' })}
                className="text-lg px-8"
              >
                Learn the Basics
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/case-studies' })}
                className="text-lg px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
              >
                View Case Studies
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
