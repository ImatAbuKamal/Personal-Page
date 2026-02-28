'use server';
/**
 * @fileOverview This file implements a Genkit flow for enhancing portfolio content.
 *
 * - enhancePortfolioContent - A function that provides AI-generated suggestions for improving project descriptions and 'About Me' sections.
 * - EnhancePortfolioContentInput - The input type for the enhancePortfolioContent function.
 * - EnhancePortfolioContentOutput - The return type for the enhancePortfolioContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePortfolioContentInputSchema = z.object({
  contentType: z.enum(['projectDescription', 'aboutMe']).describe("The type of content to enhance (e.g., 'projectDescription' or 'aboutMe')."),
  content: z.string().describe('The text content to be improved.'),
});
export type EnhancePortfolioContentInput = z.infer<typeof EnhancePortfolioContentInputSchema>;

const EnhancePortfolioContentOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of AI-generated suggestions for improving the content, focusing on clarity, impact, and SEO.'),
});
export type EnhancePortfolioContentOutput = z.infer<typeof EnhancePortfolioContentOutputSchema>;

export async function enhancePortfolioContent(input: EnhancePortfolioContentInput): Promise<EnhancePortfolioContentOutput> {
  return enhancePortfolioContentFlow(input);
}

const enhancePortfolioContentPrompt = ai.definePrompt({
  name: 'enhancePortfolioContentPrompt',
  input: {schema: EnhancePortfolioContentInputSchema},
  output: {schema: EnhancePortfolioContentOutputSchema},
  prompt: `You are an expert content editor specializing in professional portfolios. Your task is to provide constructive suggestions to improve the given content for clarity, impact, and SEO relevance.

Content Type: {{{contentType}}}
Content:
---
{{{content}}}
---

Based on the content type, analyze the provided text and offer specific, actionable suggestions. Focus on:
1.  **Clarity**: How can the language be made clearer and more concise?
2.  **Impact**: How can the content better highlight achievements, skills, and value proposition?
3.  **SEO**: What keywords or phrases could be incorporated to improve search engine visibility for relevant terms (e.g., job titles, skills, industries)?

Provide your suggestions as a list of bullet points.
`,
});

const enhancePortfolioContentFlow = ai.defineFlow(
  {
    name: 'enhancePortfolioContentFlow',
    inputSchema: EnhancePortfolioContentInputSchema,
    outputSchema: EnhancePortfolioContentOutputSchema,
  },
  async (input) => {
    const {output} = await enhancePortfolioContentPrompt(input);
    return output!;
  }
);
