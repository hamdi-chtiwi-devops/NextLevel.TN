'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Sparkles, Wand2, CheckCircle, XCircle } from 'lucide-react';
import {
  generateCodingChallenge,
  evaluateCodingSolution,
  GenerateChallengeOutput,
} from '@/ai/flows/coding-challenge-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

type GameState = 'idle' | 'generating' | 'solving' | 'evaluating' | 'feedback';

export default function CodingGamePage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [topic, setTopic] = useState('JavaScript Arrays');
  const [difficulty, setDifficulty] = useState('Easy');
  const [challenge, setChallenge] = useState<GenerateChallengeOutput | null>(null);
  const [solutionCode, setSolutionCode] = useState('');
  const [evaluation, setEvaluation] = useState<{ isCorrect: boolean; feedback: string, suggestedSolution: string } | null>(null);

  const handleGenerateChallenge = async () => {
    setGameState('generating');
    setChallenge(null);
    setEvaluation(null);
    setSolutionCode('');

    try {
      const result = await generateCodingChallenge({ topic, difficulty });
      setChallenge(result);
      setSolutionCode(result.functionSignature);
      setGameState('solving');
    } catch (error) {
      console.error('Failed to generate challenge:', error);
      setGameState('idle');
    }
  };

  const handleEvaluateSolution = async () => {
    if (!challenge || !solutionCode) return;
    setGameState('evaluating');
    try {
      const result = await evaluateCodingSolution({ challenge, solutionCode });
      setEvaluation(result);
      setGameState('feedback');
    } catch (error) {
      console.error('Failed to evaluate solution:', error);
      setGameState('solving');
    }
  };
  
  const handleTryAgain = () => {
    setGameState('idle');
    setChallenge(null);
    setEvaluation(null);
    setSolutionCode('');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Coding Arena</h1>
        <p className="text-muted-foreground">
          Sharpen your skills with AI-generated coding challenges.
        </p>
      </div>

      {gameState === 'idle' && (
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Generate a New Challenge</CardTitle>
            <CardDescription>Select a topic and difficulty to start.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JavaScript Arrays">JavaScript Arrays</SelectItem>
                  <SelectItem value="JavaScript Objects">JavaScript Objects</SelectItem>
                  <SelectItem value="Python Lists">Python Lists</SelectItem>
                  <SelectItem value="Python Dictionaries">Python Dictionaries</SelectItem>
                  <SelectItem value="Algorithms">Algorithms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateChallenge} className="w-full">
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Challenge
            </Button>
          </CardFooter>
        </Card>
      )}

      {(gameState === 'generating' || gameState === 'solving' || gameState === 'evaluating' || gameState === 'feedback') && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
                {gameState === 'generating' ? (
                    <Skeleton className="h-7 w-3/4" />
                ) : (
                    <CardTitle>{challenge?.title}</CardTitle>
                )}
                {gameState === 'generating' ? (
                    <div className="space-y-2 pt-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                ) : (
                    <CardDescription className="pt-2 prose prose-sm dark:prose-invert max-w-none">{challenge?.description}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold mb-2 text-sm">Your Code:</h3>
                {gameState === 'generating' ? (
                     <Skeleton className="h-48 w-full" />
                ) : (
                    <CodeMirror
                        value={solutionCode}
                        height="200px"
                        extensions={[javascript({ jsx: true })]}
                        onChange={(value) => setSolutionCode(value)}
                        className='border rounded-md'
                        readOnly={gameState === 'evaluating' || gameState === 'feedback'}
                    />
                )}
            </CardContent>
             <CardFooter>
                <Button onClick={handleEvaluateSolution} disabled={gameState !== 'solving'}>
                {gameState === 'evaluating' ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Evaluating...
                    </>
                ) : (
                    <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Submit Solution
                    </>
                )}
                </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>AI Feedback</CardTitle>
                <CardDescription>The AI's evaluation of your solution will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                {gameState === 'evaluating' && (
                     <div className="space-y-4">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                )}
                {gameState === 'feedback' && evaluation && (
                     <div className='space-y-4'>
                        <Alert variant={evaluation.isCorrect ? "default" : "destructive"} className="border-2">
                            {evaluation.isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            <AlertTitle className='font-bold'>{evaluation.isCorrect ? "Correct!" : "Needs Improvement"}</AlertTitle>
                            <AlertDescription>
                                {evaluation.feedback}
                            </AlertDescription>
                        </Alert>

                         <div>
                            <h3 className="font-semibold mb-2 text-sm">Suggested Solution:</h3>
                            <div className="bg-muted/50 p-4 rounded-md text-sm prose prose-sm dark:prose-invert max-w-none">
                                <pre><code>{evaluation.suggestedSolution}</code></pre>
                            </div>
                        </div>
                     </div>
                )}
                 {gameState === 'solving' && (
                    <div className="text-center text-muted-foreground p-8">
                        <p>Submit your solution to get feedback.</p>
                    </div>
                )}
            </CardContent>
            {gameState === 'feedback' && (
                <CardFooter>
                     <Button onClick={handleTryAgain} variant="secondary" className="w-full">
                        Try Another Challenge
                    </Button>
                </CardFooter>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
