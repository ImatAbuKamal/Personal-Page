
"use client";

import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

interface FooterProps {
  data?: {
    copyright: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
}

export function Footer({ data }: FooterProps) {
  if (!data) return null;

  const socialLinks = [
    { icon: <Facebook size={20} />, href: data.facebook },
    { icon: <Twitter size={20} />, href: data.twitter },
    { icon: <Instagram size={20} />, href: data.instagram },
    { icon: <Linkedin size={20} />, href: data.linkedin },
    { icon: <Github size={20} />, href: data.github },
  ];

  return (
    <footer className="bg-primary text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div className="flex gap-6">
          {socialLinks.map((link, i) => (
            link.href && link.href !== '#' && (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all hover:scale-110"
              >
                {link.icon}
              </a>
            )
          ))}
        </div>
        
        <p className="text-white/60 text-sm text-center">
          &copy; {data.copyright || `${new Date().getFullYear()} My Portfolio`}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
