'use client';

import { useState } from 'react';
import { type QuizQuestion } from '@/lib/types';
import { generateQuiz } from '@/ai/flows/quiz-auto-generation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type QuizState = 'idle' | 'loading' | 'active' | 'submitted';
type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function CourseQuiz({ courseId }: { courseId: string }) {
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answerStates, setAnswerStates] = useState<AnswerState[]>([]);
  const [score, setScore] = useState(0);

  const handleGenerateQuiz = async () => {
    setQuizState('loading');
    try {
      const result = await generateQuiz({
        lessonContent: 'React is a JavaScript library for building user interfaces. Key concepts include components, state, props, and hooks like useState and useEffect.',
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


  if (quizState === 'idle') {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader>
          <CardTitle>Test Your Knowledge</CardTitle>
          <CardDescription>Generate an AI-powered quiz to check your understanding of the material.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateQuiz}>
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (quizState === 'loading') {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader>
          <CardTitle>Generating Quiz...</CardTitle>
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Quiz Results</CardTitle>
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
            <Button onClick={() => setQuizState('idle')}>Take Another Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Course Quiz</CardTitle>
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
