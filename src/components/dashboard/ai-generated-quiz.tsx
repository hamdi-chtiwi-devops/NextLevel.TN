'use client';

import { useState } from 'react';
import { type QuizQuestion } from '@/lib/types';
import { generateQuiz } from '@/ai/flows/quiz-auto-generation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, XCircle, Wand2, BrainCircuit } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Input } from '../ui/input';

type QuizState = 'idle' | 'loading' | 'active' | 'submitted';
type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function AIGeneratedQuiz() {
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answerStates, setAnswerStates] = useState<AnswerState[]>([]);
  const [score, setScore] = useState(0);
  const [topic, setTopic] = useState('');

  const handleGenerateQuiz = async () => {
    if (!topic) return;
    setQuizState('loading');
    try {
      const result = await generateQuiz({
        lessonContent: `Generate a 3 question quiz on the topic of: ${topic}`,
        numberOfQuestions: 3,
      });
      setQuestions(result.quizQuestions);
      setUserAnswers(new Array(result.quizQuestions.length).fill(''));
      setAnswerStates(new Array(result.quizQuestions.length).fill('unanswered'));
      setQuizState('active');
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      setQuizState('idle');
    }
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let newScore = 0;
    const newAnswerStates = questions.map((q, i) => {
      if (userAnswers[i] === q.correctAnswer) {
        newScore++;
        return 'correct' as AnswerState;
      }
      return 'incorrect' as AnswerState;
    });
    setScore(newScore);
    setAnswerStates(newAnswerStates);
    setQuizState('submitted');
  };

  const getBorderColor = (state: AnswerState) => {
    if (quizState !== 'submitted') return '';
    if (state === 'correct') return 'border-green-500';
    if (state === 'incorrect') return 'border-red-500';
    return '';
  };

  const handleReset = () => {
    setQuizState('idle');
    setTopic('');
    setQuestions([]);
    setUserAnswers([]);
    setAnswerStates([]);
  }

  if (quizState === 'idle') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 />
            AI-Powered Quick Quiz
          </CardTitle>
          <CardDescription>Test your knowledge on any topic. Enter a subject below to generate a short quiz.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="e.g., 'React Hooks' or 'Quantum Physics'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
            />
            <Button onClick={handleGenerateQuiz} disabled={!topic}>
              Generate Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (quizState === 'loading') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generating Quiz...</CardTitle>
          <CardDescription>AI is crafting questions about "{topic}" for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (quizState === 'submitted') {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Quiz Results: {topic}</CardTitle>
          <CardDescription>You scored {score} out of {questions.length}</CardDescription>
        </CardHeader>
        <CardContent>
           <Alert variant={percentage >= 70 ? 'default' : 'destructive'} className='border-2'>
            <AlertTitle className='font-bold text-lg'>
                {percentage >= 70 ? 'Great job!' : 'Needs Improvement'}
            </AlertTitle>
            <AlertDescription>
                Your score is {percentage}%. {percentage >= 70 ? 'You have a solid understanding.' : 'Review the material and try again.'}
            </AlertDescription>
          </Alert>
          <div className="mt-6 space-y-4">
            {questions.map((q, i) => (
                <div key={i} className={`p-4 rounded-lg border-2 ${getBorderColor(answerStates[i])}`}>
                    <p className="font-semibold">{i + 1}. {q.question}</p>
                    <p className={`text-sm mt-2 ${answerStates[i] === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                        Your answer: {userAnswers[i] || 'Not answered'}
                    </p>
                    {answerStates[i] === 'incorrect' && (
                        <p className="text-sm text-green-600">Correct answer: {q.correctAnswer}</p>
                    )}
                </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
            <Button onClick={handleReset}>Take Another Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz: {topic}</CardTitle>
        <CardDescription>Select the best answer for each question.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, i) => (
          <div key={i}>
            <p className="font-semibold mb-3">{i + 1}. {q.question}</p>
            <RadioGroup onValueChange={(value) => handleAnswerChange(i, value)}>
              <div className="space-y-2">
                {q.options.map((option, j) => (
                  <div key={j} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${i}-o${j}`} />
                    <Label htmlFor={`q${i}-o${j}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmitQuiz} className="w-full">
          Submit Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}
