
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
    // Mengatur tahun secara dinamis untuk hidrasi yang aman
    setYear(new Date().getFullYear());
  }, []);

  // Data default sesuai permintaan user
  const defaultFooter = {
    copyright: "2026 Imat Abu Kamal",
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    github: "#"
  };

  const finalData = data || defaultFooter;

  const socialLinks = [
    { icon: <Facebook size={20} />, href: finalData.facebook },
    { icon: <Twitter size={20} />, href: finalData.twitter },
    { icon: <Instagram size={20} />, href: finalData.instagram },
    { icon: <Linkedin size={20} />, href: finalData.linkedin },
    { icon: <Github size={20} />, href: finalData.github },
  ];

  const displayName = ownerName || "Imat Abu Kamal";
  const copyrightText = finalData.copyright || `${year || 2026} ${displayName}`;

  return (
    <footer className="bg-primary text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div className="flex gap-6">
          {socialLinks.map((link, i) => (
            // Hanya tampilkan jika link bukan "#" atau tampilkan sebagai placeholder jika diinginkan
            // Di sini kita tampilkan semua icon, namun dengan opacity rendah jika hanya "#"
            <a
              key={i}
              href={link.href === "#" ? undefined : link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all hover:scale-110 ${
                link.href === "#" ? "opacity-40 cursor-default" : "hover:bg-white hover:text-primary"
              }`}
            >
              {link.icon}
            </a>
          ))}
        </div>
        
        <p className="text-white/60 text-sm text-center font-medium tracking-wide">
          &copy; {copyrightText}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
