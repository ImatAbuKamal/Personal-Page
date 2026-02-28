
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  title?: string;
  subtitle?: string;
  slides?: Array<{ imageUrl: string; caption: string }>;
}

export function Hero({ title, subtitle, slides = [] }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Carousel */}
      <div className="absolute inset-0 z-0">
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
                index === currentSlide ? "opacity-100" : "opacity-0"
              )}
              style={{ backgroundImage: `url('${slide.imageUrl}')` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              {slide.caption && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm">
                  {slide.caption}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-80" />
        )}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          {title || "Welcome to My Portfolio"}
        </h1>
        <p className="text-lg md:text-2xl text-white/90 mb-10 drop-shadow-md">
          {subtitle || "Passionate Developer & Creator"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 px-10 text-lg rounded-full">
            <a href="#contact">Hubungi Saya</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-10 text-lg rounded-full">
            <a href="#about">Lihat Profile</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
