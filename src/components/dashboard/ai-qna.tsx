'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { askQuestion } from '@/ai/flows/answer-question-flow';
import { Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function AIQnA() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer('');
    try {
      const result = await askQuestion({ question });
      setAnswer(result.answer);
    } catch (error) {
      console.error('Failed to get answer:', error);
      setAnswer('Sorry, I was unable to answer that question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BrainCircuit />
            AI Question & Answer
        </CardTitle>
        <CardDescription>Ask any question and get an AI-powered answer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., 'What is the difference between JavaScript and TypeScript?'"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleAskQuestion} disabled={loading || !question}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI
            </>
          )}
        </Button>

        {loading && (
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}

        {answer && !loading && (
          <div className="p-4 bg-muted/50 rounded-lg text-sm prose prose-sm dark:prose-invert max-w-none">
            <p>{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
