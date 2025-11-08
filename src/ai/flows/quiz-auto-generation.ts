'use server';

/**
 * @fileOverview A quiz auto-generation AI agent.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  lessonContent: z
    .string()
    .describe('The content of the lesson for which to generate a quiz.'),
  numberOfQuestions: z
    .number()
    .default(5)
    .describe('The number of questions to generate for the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quizQuestions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answers to the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The generated quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert educator, skilled at creating quizzes.

  Given the lesson content below, generate a quiz with the specified number of questions.
  Each question should have multiple choice options, and you should indicate the correct answer.

  Lesson Content: {{{lessonContent}}}

  Number of Questions: {{{numberOfQuestions}}}

  Ensure that the quiz questions are relevant to the lesson content and that the correct answers are accurate.
  The response should be a JSON object with a "quizQuestions" field that contains an array of question objects.
  Each question object should have a "question", "options", and "correctAnswer" field.
  The "options" field should be an array of strings.
  The "correctAnswer" field should be one of the options.
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
