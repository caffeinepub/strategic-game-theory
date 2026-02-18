import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, BookOpen } from 'lucide-react';

export default function LearningResourcesPage() {
  const resources = [
    {
      level: 'Beginner',
      items: [
        {
          title: 'Introduction to Game Theory',
          description:
            'Learn the basic concepts of game theory including players, strategies, and payoffs. Perfect for those new to strategic thinking.',
          type: 'Article',
        },
        {
          title: 'Understanding Nash Equilibrium',
          description:
            'A gentle introduction to the most important solution concept in game theory with simple examples.',
          type: 'Article',
        },
        {
          title: 'The Prisoner\'s Dilemma in Business',
          description:
            'Explore how the classic Prisoner\'s Dilemma applies to business competition and cooperation.',
          type: 'Case Study',
        },
      ],
    },
    {
      level: 'Intermediate',
      items: [
        {
          title: 'Mixed Strategies and Randomization',
          description:
            'Learn when and how to use mixed strategies in competitive situations where predictability is costly.',
          type: 'Article',
        },
        {
          title: 'Sequential Games and Backward Induction',
          description:
            'Master the analysis of games where players move in sequence, including credible commitments and threats.',
          type: 'Tutorial',
        },
        {
          title: 'Auction Design Principles',
          description:
            'Understand the theory behind different auction formats and their strategic implications for bidders.',
          type: 'Article',
        },
      ],
    },
    {
      level: 'Advanced',
      items: [
        {
          title: 'Repeated Games and Cooperation',
          description:
            'Explore how repeated interactions enable cooperation through reputation and punishment mechanisms.',
          type: 'Article',
        },
        {
          title: 'Mechanism Design and Incentive Compatibility',
          description:
            'Learn how to design rules and institutions that align individual incentives with desired outcomes.',
          type: 'Tutorial',
        },
        {
          title: 'Bargaining Theory and the Nash Solution',
          description:
            'Deep dive into cooperative bargaining theory and axiomatic approaches to fair division.',
          type: 'Article',
        },
      ],
    },
  ];

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/assets/downloads/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageLayout
      title="Learning Resources"
      description="Comprehensive learning materials organized by difficulty level. Start with the basics or dive into advanced topics."
    >
      <div className="space-y-8">
        {/* Downloadable Resources */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Downloadable Study Materials
            </CardTitle>
            <CardDescription>
              Download comprehensive notes and summaries for offline study. No login required.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => handleDownload('game-theory-core-concepts.md')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Core Concepts Summary
            </Button>
          </CardContent>
        </Card>

        {/* Learning Resources by Level */}
        {resources.map((section) => (
          <div key={section.level}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">{section.level}</h2>
              <Badge
                variant={
                  section.level === 'Beginner' ? 'default' : section.level === 'Intermediate' ? 'secondary' : 'outline'
                }
              >
                {section.items.length} Resources
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, idx) => (
                <Card key={idx} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
