/**
 * @fileOverview Defines the data structures for the portfolio.
 */

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
