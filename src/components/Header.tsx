
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
    <>
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
            className="md:hidden text-primary p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay (optional, for closing on click outside) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed right-0 bottom-0 bg-background z-40 transition-transform duration-300 md:hidden w-[66.6%] border-l border-border shadow-2xl",
          isScrolled ? "top-16" : "top-20",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-8">
          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-semibold text-primary hover:text-accent block py-2 border-b border-muted/30"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Button 
                size="lg" 
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenMessage();
                }}
                className="w-full bg-primary text-white rounded-full"
              >
                Message
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
