
import { enhancePortfolioContent, EnhancePortfolioContentInput } from '@/ai/flows/enhance-portfolio-content';

export const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxGtc7RfmzgiESA2SAzx0lMBQneu82fQ_B0f2FlGDlv5B4oAgr2pNPbmDNYI8z74D8MtQ/exec";

export interface PortfolioData {
  about?: {
    title: string;
    description: string;
    imageUrl: string;
    skills: string;
  };
  home?: {
    title: string;
    subtitle: string;
  };
  carousel?: Array<{
    imageUrl: string;
    caption: string;
  }>;
  contact?: {
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
  };
  footer?: {
    copyright: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
  gallery?: Array<{
    title: string;
    imageUrl: string;
    learned: string[];
    results: string[];
  }>;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const response = await fetch(APP_SCRIPT_URL);
  if (!response.ok) throw new Error("Gagal mengambil data portfolio");
  return response.json();
}

export async function getAIEnhancedContent(contentType: 'projectDescription' | 'aboutMe', content: string) {
  return await enhancePortfolioContent({ contentType, content });
}

export async function submitMessage(payload: URLSearchParams) {
  const response = await fetch(APP_SCRIPT_URL, {
    method: "POST",
    body: payload,
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}
