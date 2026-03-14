
"use client";

import { useMemo } from "react";
import Image from "next/image";

interface AboutProps {
  data?: {
    title: string;
    description: string;
    imageUrl: string;
    skills: string;
  };
}

export function About({ data }: AboutProps) {
  if (!data) return null;

  const skills = useMemo(() => 
    data.skills ? data.skills.split(";").map((s) => s.trim()) : [],
    [data.skills]
  );

  return (
    <section id="about" className="@container py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">About Me</h2>
        
        <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto @3xl:mx-0">
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-8 border-background group transition-all duration-500 hover:scale-105 hover:shadow-primary/20">
              <Image 
                src={data.imageUrl} 
                alt={data.title} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint="professional profile"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full -z-10 animate-pulse" />
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-full -z-10" />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">{data.title}</h3>
            
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {data.description}
            </p>

            {skills.length > 0 && (
              <div>
                <h4 className="font-semibold text-primary mb-3">Skills & Expertise</h4>
                <div className="flex flex-wrap">
                  {skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
