
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
  // Jika data belum ada, jangan renderr apapun untuk menghindari tampilan rusak
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
          <div className="relative aspect-square max-w-md mx-auto @3xl:mx-0 overflow-hidden rounded-2xl shadow-xl group">
            <Image 
              src={data.imageUrl} 
              alt="Profile" 
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint="professional profile"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
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
