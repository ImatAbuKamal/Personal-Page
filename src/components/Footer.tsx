"use client";

import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

interface FooterProps {
  data?: {
    copyright?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

export function Footer({ data }: FooterProps) {
  // Default values based on user request
  const defaultData = {
    copyright: "2026 My Portfolio",
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    github: "#",
  };

  const finalData = {
    copyright: data?.copyright || defaultData.copyright,
    facebook: data?.facebook || defaultData.facebook,
    twitter: data?.twitter || defaultData.twitter,
    instagram: data?.instagram || defaultData.instagram,
    linkedin: data?.linkedin || defaultData.linkedin,
    github: data?.github || defaultData.github,
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: finalData.facebook },
    { icon: <Twitter size={20} />, href: finalData.twitter },
    { icon: <Instagram size={20} />, href: finalData.instagram },
    { icon: <Linkedin size={20} />, href: finalData.linkedin },
    { icon: <Github size={20} />, href: finalData.github },
  ];

  return (
    <footer className="bg-primary text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div className="flex gap-6">
          {socialLinks.map((link, i) => (
            link.href && (
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
          &copy; {finalData.copyright}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
