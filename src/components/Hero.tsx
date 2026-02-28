
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
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  return (
    <section id="home" className="@container relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
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
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-black/80" />
        )}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000 flex flex-col items-center">
        <h1 className="text-4xl @xs:text-5xl @md:text-7xl @lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl leading-[1.1] tracking-tight">
          {title || "Selamat Datang di Portfolio Saya"}
        </h1>
        <p className="text-lg @md:text-xl @lg:text-2xl text-white/90 mb-12 drop-shadow-lg font-medium tracking-wide">
          {subtitle || "Web Developer & UI/UX Designer"}
        </p>
        
        <div className="flex flex-col @sm:flex-row gap-6 justify-center w-full @sm:w-auto">
          <Button 
            asChild 
            size="lg" 
            className="bg-secondary text-white hover:bg-secondary/90 px-10 h-16 text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-95 border-none"
          >
            <a href="#contact">Hubungi Saya</a>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="ghost" 
            className="bg-black/30 backdrop-blur-md text-white border border-white/20 hover:bg-black/50 px-10 h-16 text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-95"
          >
            <a href="#about">Lihat Profile</a>
          </Button>
        </div>

        {/* Caption at the bottom */}
        {slides.length > 0 && slides[currentSlide].caption && (
          <div className="absolute -bottom-32 @md:-bottom-48 left-1/2 -translate-x-1/2">
             <div className="bg-black/40 backdrop-blur-md px-8 py-2 rounded-full text-white/90 text-sm md:text-base border border-white/10 whitespace-nowrap shadow-sm">
              {slides[currentSlide].caption}
            </div>
          </div>
        )}
      </div>

      {/* Floating Logo hint */}
      <div className="absolute bottom-10 left-10 z-20 flex flex-col gap-2">
        <div className="w-14 h-14 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white font-bold text-2xl shadow-2xl backdrop-blur-sm">
          N
        </div>
        <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white font-bold text-xs shadow-xl backdrop-blur-sm ml-[-10px] mt-[-10px]">
          N
        </div>
      </div>
    </section>
  );
}
