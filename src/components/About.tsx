
"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAIEnhancedContent } from "@/lib/portfolio-service";
import { useToast } from "@/hooks/use-toast";

interface AboutProps {
  data?: {
    title: string;
    description: string;
    imageUrl: string;
    skills: string;
  };
}

export function About({ data }: AboutProps) {
  const [enhancedDesc, setEnhancedDesc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!data?.description) return;
    setIsLoading(true);
    try {
      const result = await getAIEnhancedContent('aboutMe', data.description);
      const firstSuggestion = result.suggestions[0];
      setEnhancedDesc(firstSuggestion);
      toast({
        title: "AI Suggestion Ready!",
        description: "Kami telah menyempurnakan deskripsi Anda.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memproses peningkatan AI.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) return null;

  const skills = data.skills ? data.skills.split(";").map((s) => s.trim()) : [];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl group">
            <img 
              src={data.imageUrl} 
              alt="Profile" 
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              data-ai-hint="professional profile"
            />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-primary">{data.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEnhance}
                disabled={isLoading}
                className="text-accent hover:text-accent hover:bg-accent/10"
              >
                {isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                AI Enhance
              </Button>
            </div>
            
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {enhancedDesc || data.description}
            </p>

            {enhancedDesc && (
              <Button 
                variant="link" 
                onClick={() => setEnhancedDesc(null)} 
                className="text-accent p-0"
              >
                Kembali ke teks asli
              </Button>
            )}

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
