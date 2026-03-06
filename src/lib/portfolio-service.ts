'use server';

/**
 * @fileOverview This file provides server-side actions for fetching and submitting portfolio data.
 * These functions run on the server to bypass CORS restrictions.
 */

import { enhancePortfolioContent } from '@/ai/flows/enhance-portfolio-content';
import { APP_SCRIPT_URL } from './constants';
import type { PortfolioData } from './portfolio-types';

/**
 * Fetches the complete portfolio data from the Google Apps Script API.
 * Performed as a Server Action to bypass client-side CORS.
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const response = await fetch(APP_SCRIPT_URL, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Gagal mengambil data portfolio: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching portfolio data on server:", error);
    throw error;
  }
}

/**
 * Uses GenAI to enhance or suggest improvements for portfolio content.
 */
export async function getAIEnhancedContent(contentType: 'projectDescription' | 'aboutMe', content: string) {
  return await enhancePortfolioContent({ contentType, content });
}

/**
 * Submits a contact message to the Google Apps Script backend.
 */
export async function submitMessageAction(formData: { 
  name: string; 
  email: string; 
  phone: string; 
  subject: string; 
  message: string; 
  photo: string; 
  photoName: string; 
  photoType: string;
}) {
  try {
    const payload = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    const response = await fetch(APP_SCRIPT_URL, {
      method: "POST",
      body: payload,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error submitting message on server:", error);
    throw error;
  }
}
