import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is a Nash equilibrium?',
    options: [
      'A strategy that guarantees the highest payoff',
      'A set of strategies where no player can improve by unilaterally changing their strategy',
      'The strategy that maximizes total welfare',
      'A strategy that involves randomization',
    ],
    correctAnswer: 1,
    explanation:
      'A Nash equilibrium is a stable outcome where no player has an incentive to deviate unilaterally. Each player\'s strategy is a best response to the others\' strategies.',
  },
  {
    id: 2,
    question: 'In a second-price sealed-bid auction, what is the optimal bidding strategy?',
    options: [
      'Bid slightly below your true valuation',
      'Bid your true valuation',
      'Bid above your true valuation to increase winning chances',
      'Bid half of your true valuation',
    ],
    correctAnswer: 1,
    explanation:
      'Bidding your true valuation is a dominant strategy in second-price auctions. You pay the second-highest bid if you win, so truthful bidding maximizes your expected utility.',
  },
  {
    id: 3,
    question: 'What does a dominant strategy mean?',
    options: [
      'A strategy that wins most of the time',
      'A strategy that is best regardless of what other players do',
      'A strategy used by the strongest player',
      'A strategy that involves aggressive competition',
    ],
    correctAnswer: 1,
    explanation:
      'A dominant strategy yields a better payoff than any other strategy, no matter what strategies other players choose. If you have a dominant strategy, you should always play it.',
  },
  {
    id: 4,
    question: 'Why might firms cooperate in a repeated game but not in a one-shot game?',
    options: [
      'Repeated games have different rules',
      'Players can punish defection in future rounds, making cooperation sustainable',
      'Cooperation is always optimal in repeated games',
      'One-shot games don\'t have Nash equilibria',
    ],
    correctAnswer: 1,
    explanation:
      'In repeated games, the threat of future punishment can sustain cooperation. Players cooperate because they value future payoffs and know that defection will be punished, making cooperation a better long-term strategy.',
  },
  {
    id: 5,
    question: 'In a market entry game, when is an incumbent\'s threat to fight entry credible?',
    options: [
      'Always, because incumbents want to protect their market',
      'Only when fighting is more profitable than accommodating after entry occurs',
      'Never, because fighting is always costly',
      'When the incumbent is larger than the entrant',
    ],
    correctAnswer: 1,
    explanation:
      'A threat is credible only if it\'s in the player\'s interest to carry it out. If accommodation is more profitable than fighting after entry occurs, the threat to fight is not credible and won\'t deter entry.',
  },
  {
    id: 6,
    question: 'What is the key insight of the Nash bargaining solution?',
    options: [
      'The stronger party gets everything',
      'Split everything equally regardless of alternatives',
      'Maximize the product of gains above disagreement payoffs, weighted by bargaining power',
      'Always split 60-40 in favor of the buyer',
    ],
    correctAnswer: 2,
    explanation:
      'The Nash bargaining solution maximizes the weighted product of gains above disagreement points. This reflects both efficiency (using all surplus) and fairness (respecting relative bargaining power and alternatives).',
  },
];

export default function QuizSimulationPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    if (isCorrect && !answeredQuestions[currentQuestion]) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setQuizComplete(false);
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
  const percentage = Math.round((score / questions.length) * 100);

  if (quizComplete) {
    return (
      <PageLayout title="Quiz Complete!" description="See how well you understand game theory concepts.">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Your Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {score}/{questions.length}
              </div>
              <p className="text-xl text-muted-foreground">
                {percentage}% Correct
              </p>
            </div>

            <Alert className={percentage >= 70 ? 'bg-primary/10 border-primary' : 'bg-muted'}>
              <AlertTitle className="text-lg">
                {percentage >= 90
                  ? '🎉 Excellent! You\'re a game theory expert!'
                  : percentage >= 70
                    ? '👍 Good job! You have a solid understanding.'
                    : '📚 Keep learning! Review the concepts and try again.'}
              </AlertTitle>
              <AlertDescription className="mt-2">
                {percentage >= 70
                  ? 'You have a strong grasp of game theory fundamentals. Consider exploring the advanced learning resources.'
                  : 'Review the About Game Theory section and try the interactive models to strengthen your understanding.'}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRestart} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              <Button onClick={() => navigate({ to: '/about' })} size="lg">
                Review Concepts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Game Theory Quiz"
      description="Test your understanding of game theory concepts with this interactive quiz. Get immediate feedback on each question."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>
            Score: {score}/{questions.length}
          </span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => handleAnswerSelect(parseInt(val))}>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                      showFeedback
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : index === selectedAnswer
                            ? 'border-red-500 bg-red-50 dark:bg-red-950'
                            : 'border-muted'
                        : selectedAnswer === index
                          ? 'border-primary bg-primary/5'
                          : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showFeedback} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                    {showFeedback && index === questions[currentQuestion].correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {showFeedback && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>

            {showFeedback && (
              <Alert className={isCorrect ? 'bg-green-50 dark:bg-green-950 border-green-500' : 'bg-red-50 dark:bg-red-950 border-red-500'}>
                <AlertTitle className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Correct!
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      Incorrect
                    </>
                  )}
                </AlertTitle>
                <AlertDescription className="mt-2">{questions[currentQuestion].explanation}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between">
              {!showFeedback ? (
                <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="ml-auto">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="ml-auto">
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
