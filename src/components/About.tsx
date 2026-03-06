
"use client";

import { useMemo } from "react";

interface AboutProps {
  data?: {
    title: string;
    description: string;
    imageUrl: string;
    skills: string;
  };
}

export function About({ data }: AboutProps) {
  // Fallback data for Imat Abu Kamal
  const defaultData = {
    title: "Imat Abu Kamal",
    description: "Halo, saya Imat Abu Kamal. Dengan pengalaman lebih dari 5 tahun sebagai Web Developer, saya membantu mewujudkan ide-ide menjadi produk digital yang fungsional dan menarik. Keahlian utama saya meliputi JavaScript, React, dan Node.js, dengan pemahaman kuat di bidang UI/UX untuk memastikan tampilan yang tidak hanya bagus, tetapi juga nyaman digunakan. Mari berdiskusi tentang kebutuhan website atau aplikasi Anda!",
    imageUrl: "https://res.cloudinary.com/deslfnurw/image/upload/v1751596970/Imat_qkty9y.png",
    skills: "HTML;CSS;JavaScript;React;Node.js;UI/UX"
  };

  const finalData = data || defaultData;
  const skills = useMemo(() => 
    finalData.skills ? finalData.skills.split(";").map((s) => s.trim()) : [],
    [finalData.skills]
  );

  return (
    <section id="about" className="@container py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">About Me</h2>
        
        <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto @3xl:mx-0 overflow-hidden rounded-2xl shadow-xl group">
            <img 
              src={finalData.imageUrl} 
              alt="Profile" 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              data-ai-hint="professional profile"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">{finalData.title}</h3>
            
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {finalData.description}
            </p>

            <div>
              <h4 className="font-semibold text-primary mb-3">Skills & Expertise</h4>
              <div className="flex flex-wrap">
                {skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
