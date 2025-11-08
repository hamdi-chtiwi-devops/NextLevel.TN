'use server';

/**
 * @fileOverview Personalized course recommendations AI agent.
 *
 * - getPersonalizedCourseRecommendations - A function that retrieves personalized course recommendations.
 * - PersonalizedCourseRecommendationsInput - The input type for the getPersonalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the getPersonalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  learningHistory: z
    .string()
    .describe(
      'A summary of the student\'s learning history, including completed courses, quiz scores, and preferred topics.'
    ),
  preferences: z.string().describe('The student\'s learning preferences (e.g., preferred format, difficulty level).'),
});
export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z
    .array(z.string())
    .describe('A list of recommended course titles based on the student\'s learning history and preferences.'),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function getPersonalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized course recommendations to students.

  Based on the student's learning history and preferences, recommend a list of courses that would be relevant and interesting to them.

  Student ID: {{{studentId}}}
  Learning History: {{{learningHistory}}}
  Preferences: {{{preferences}}}

  Please provide a list of course titles in the following format:
  [\"Course Title 1\", \"Course Title 2\", \"Course Title 3\"]`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
