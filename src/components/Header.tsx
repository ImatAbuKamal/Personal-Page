
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  logoTitle?: string;
  onOpenMessage: () => void;
}

export function Header({ logoTitle, onOpenMessage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center px-6 md:px-12",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm h-16" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-primary flex items-center" 
          dangerouslySetInnerHTML={{ __html: logoTitle || 'My<span>Portfolio</span>' }}
        />

        <nav className="hidden md:block">
          <ul className="flex gap-8 items-center">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-medium hover:text-accent transition-colors text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Button 
                variant="outline" 
                onClick={onOpenMessage}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Message
              </Button>
            </li>
          </ul>
        </nav>

        <button
          className="md:hidden text-primary p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background z-40 transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-primary hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Button 
              size="lg" 
              onClick={() => {
                setIsMenuOpen(false);
                onOpenMessage();
              }}
              className="bg-primary text-white"
            >
              Message
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
