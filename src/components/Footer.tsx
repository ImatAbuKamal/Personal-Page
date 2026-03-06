
"use client";

import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { useEffect, useState } from "react";

interface FooterProps {
  data?: {
    copyright?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  ownerName?: string;
}

export function Footer({ data, ownerName }: FooterProps) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Mengatur tahun secara dinamis di sisi klien untuk menghindari kesalahan hidrasi
    setYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { icon: <Facebook size={20} />, href: data?.facebook || "#" },
    { icon: <Twitter size={20} />, href: data?.twitter || "#" },
    { icon: <Instagram size={20} />, href: data?.instagram || "#" },
    { icon: <Linkedin size={20} />, href: data?.linkedin || "#" },
    { icon: <Github size={20} />, href: data?.github || "#" },
  ];

  // Menggunakan ownerName (dari About title) jika data.copyright dari API kosong
  const currentYear = year || 2025;
  const displayName = ownerName || "My Portfolio";
  const copyrightText = data?.copyright || `${currentYear} ${displayName}`;

  return (
    <footer className="bg-primary text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div className="flex gap-6">
          {socialLinks.map((link, i) => (
            link.href && link.href !== "#" && (
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
          &copy; {copyrightText}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
