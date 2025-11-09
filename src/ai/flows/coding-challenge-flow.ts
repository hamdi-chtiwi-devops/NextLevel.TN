'use server';

/**
 * @fileOverview An AI agent for generating and evaluating coding challenges.
 *
 * - generateCodingChallenge - Generates a new coding challenge.
 * - evaluateCodingSolution - Evaluates a user's solution to a challenge.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schema for generating a challenge
const GenerateChallengeInputSchema = z.object({
  topic: z.string().describe('The programming topic for the challenge (e.g., "JavaScript Arrays", "Python Dictionaries").'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the challenge.'),
});
export type GenerateChallengeInput = z.infer<typeof GenerateChallengeInputSchema>;

const GenerateChallengeOutputSchema = z.object({
  title: z.string().describe('A creative and descriptive title for the challenge.'),
  description: z.string().describe('A detailed description of the coding problem to solve, including requirements and constraints.'),
  functionSignature: z.string().describe('The function signature or starting snippet for the user.'),
});
export type GenerateChallengeOutput = z.infer<typeof GenerateChallengeOutputSchema>;

// Schema for evaluating a solution
const EvaluateSolutionInputSchema = z.object({
  challenge: GenerateChallengeOutputSchema.describe("The original challenge that was generated."),
  solutionCode: z.string().describe("The user's submitted code solution."),
});
export type EvaluateSolutionInput = z.infer<typeof EvaluateSolutionInputSchema>;

const EvaluateSolutionOutputSchema = z.object({
  isCorrect: z.boolean().describe('Whether the solution correctly solves the problem.'),
  feedback: z.string().describe('Detailed feedback on the user\'s solution, explaining what is correct, what is incorrect, and suggesting improvements.'),
  suggestedSolution: z.string().describe('An example of a correct and optimal solution.'),
});
export type EvaluateSolutionOutput = z.infer<typeof EvaluateSolutionOutputSchema>;


// Exported functions
export async function generateCodingChallenge(input: GenerateChallengeInput): Promise<GenerateChallengeOutput> {
  return generateChallengeFlow(input);
}

export async function evaluateCodingSolution(input: EvaluateSolutionInput): Promise<EvaluateSolutionOutput> {
  return evaluateSolutionFlow(input);
}


// Define Prompts
const generateChallengePrompt = ai.definePrompt({
  name: 'generateCodingChallengePrompt',
  input: { schema: GenerateChallengeInputSchema },
  output: { schema: GenerateChallengeOutputSchema },
  prompt: `You are an expert programming instructor creating a coding challenge for a student.
  
  Topic: {{{topic}}}
  Difficulty: {{{difficulty}}}
  
  Please generate a unique and interesting coding challenge based on the topic and difficulty.
  
  The description should be clear, concise, and provide at least one example.
  The function signature should be a simple starting point for the user in JavaScript.
  Do not include test cases in the description. Just the problem statement.
  `,
});

const evaluateSolutionPrompt = ai.definePrompt({
  name: 'evaluateCodingSolutionPrompt',
  input: { schema: EvaluateSolutionInputSchema },
  output: { schema: EvaluateSolutionOutputSchema },
  prompt: `You are an expert code reviewer. A student has submitted a solution for a coding challenge.
  
  ## The Challenge:
  **Title:** {{{challenge.title}}}
  **Description:** {{{challenge.description}}}
  
  ## The Student's Solution:
  '''javascript
  {{{solutionCode}}}
  '''
  
  Please evaluate the solution.
  1.  Determine if the code correctly and efficiently solves the problem described.
  2.  Provide constructive feedback. If it's correct, praise them and explain why it's a good solution. If it's incorrect, gently explain the errors and provide hints.
  3.  Provide a corrected or optimized version of the solution as an example.
  `,
});

// Define Flows
const generateChallengeFlow = ai.defineFlow(
  {
    name: 'generateChallengeFlow',
    inputSchema: GenerateChallengeInputSchema,
    outputSchema: GenerateChallengeOutputSchema,
  },
  async (input) => {
    const { output } = await generateChallengePrompt(input);
    return output!;
  }
);

const evaluateSolutionFlow = ai.defineFlow(
  {
    name: 'evaluateSolutionFlow',
    inputSchema: EvaluateSolutionInputSchema,
    outputSchema: EvaluateSolutionOutputSchema,
  },
  async (input) => {
    const { output } = await evaluateSolutionPrompt(input);
    return output!;
  }
);
