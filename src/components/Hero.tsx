
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
                "absolute inset-0 transition-opacity duration-1000",
                index === currentSlide ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={slide.imageUrl}
                alt={slide.caption || "Hero Background"}
                fill
                className="object-cover"
                priority={index === 0}
                quality={85}
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-black/80" />
        )}
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-7xl animate-in fade-in slide-in-from-bottom-10 duration-1000 flex flex-col items-center">
        {/* Marquee Title with strictly controlled responsive font sizes */}
        <div className="w-full overflow-hidden mb-8">
          <h1 className="text-2xl @xs:text-3xl @md:text-4xl @3xl:text-6xl @5xl:text-7xl @7xl:text-8xl font-bold text-white drop-shadow-2xl leading-[1.1] tracking-tight animate-marquee px-4">
            {title || "Selamat Datang di Portfolio Saya"}
          </h1>
        </div>

        <p className="text-sm @xs:text-base @md:text-lg @3xl:text-xl @5xl:text-2xl text-white/90 mb-12 drop-shadow-lg font-medium tracking-wide max-w-2xl px-6">
          {subtitle || "Web Developer & UI/UX Designer"}
        </p>
        
        {/* Mobile-first button stack: Contact above Profile on mobile */}
        <div className="flex flex-col @3xl:flex-row gap-4 @3xl:gap-6 justify-center w-full @3xl:w-auto px-6">
          <Button 
            asChild 
            size="lg" 
            className="bg-secondary text-white hover:bg-secondary/90 h-14 @3xl:h-16 text-lg @3xl:text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-95 border-none order-1 @3xl:order-none"
          >
            <a href="#contact">Hubungi Saya</a>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="ghost" 
            className="bg-black/30 backdrop-blur-md text-white border border-white/20 hover:bg-black/50 h-14 @3xl:h-16 text-lg @3xl:text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-95 order-2 @3xl:order-none"
          >
            <a href="#about">Lihat Profile</a>
          </Button>
        </div>

        {/* Caption at the bottom */}
        {slides.length > 0 && slides[currentSlide].caption && (
          <div className="absolute -bottom-24 @3xl:-bottom-32 left-1/2 -translate-x-1/2">
             <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full text-white/90 text-xs @3xl:text-sm border border-white/10 whitespace-nowrap shadow-sm">
              {slides[currentSlide].caption}
            </div>
          </div>
        )}
      </div>

      {/* Floating Logo UI */}
      <div className="absolute bottom-6 left-6 @3xl:bottom-10 @3xl:left-10 z-20 flex flex-col gap-2">
        <div className="w-10 h-10 @3xl:w-14 @3xl:h-14 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white font-bold text-xl @3xl:text-2xl shadow-2xl backdrop-blur-sm">
          N
        </div>
        <div className="w-6 h-6 @3xl:w-8 @3xl:h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white font-bold text-[10px] @3xl:text-xs shadow-xl backdrop-blur-sm ml-[-8px] mt-[-8px]">
          N
        </div>
      </div>
    </section>
  );
}
