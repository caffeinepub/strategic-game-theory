import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSubmitFeedback } from '@/hooks/useSubmitFeedback';
import { CheckCircle2, Send } from 'lucide-react';

export default function ContactFeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<string>('question');
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: submitFeedback, isPending, isError, error } = useSubmitFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    submitFeedback(
      {
        name: name.trim() || null,
        email: email.trim() || null,
        message: message.trim(),
        category: category as any,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setName('');
          setEmail('');
          setMessage('');
          setCategory('question');
          setTimeout(() => setShowSuccess(false), 5000);
        },
      }
    );
  };

  return (
    <PageLayout
      title="Contact & Feedback"
      description="Have questions, suggestions, or feedback? We'd love to hear from you. All fields except message are optional."
    >
      <div className="max-w-2xl mx-auto">
        {showSuccess && (
          <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-500">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Thank you for your feedback!</AlertTitle>
            <AlertDescription>
              We've received your message and will review it carefully. Your input helps us improve the platform.
            </AlertDescription>
          </Alert>
        )}

        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription>
              {error?.message || 'Unable to submit your feedback. Please try again later.'}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Send Us Your Feedback</CardTitle>
            <CardDescription>
              Whether you found a bug, have a content suggestion, or just want to ask a question, we're here to help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="contentSuggestion">Content Suggestion</SelectItem>
                    <SelectItem value="bugReport">Bug Report</SelectItem>
                    <SelectItem value="featureRequest">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  required
                  className="resize-none"
                />
                {!message.trim() && (
                  <p className="text-sm text-muted-foreground mt-1">Message is required</p>
                )}
              </div>

              <Button type="submit" disabled={isPending || !message.trim()} className="w-full md:w-auto">
                {isPending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
