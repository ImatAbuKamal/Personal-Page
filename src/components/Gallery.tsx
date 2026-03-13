
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface GalleryItem {
  title: string;
  imageUrl: string;
  learned: string[];
  results: string[];
}

interface GalleryProps {
  items?: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  // Jika tidak ada item di galeri, sembunyikan section ini
  if (!items || items.length === 0) return null;

  return (
    <section id="gallery" className="@container py-24 px-4 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">My Projects</h2>
        
        <div className="grid grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="project design"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  
                  <div className="space-y-4">
                    {item.learned && item.learned.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Teknologi</span>
                        <div className="flex flex-wrap gap-2">
                          {item.learned.map((tech, i) => (
                            <Badge key={i} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-none rounded-md text-xs px-2 py-0">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.results && item.results.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Hasil Utama</span>
                        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                          {item.results.map((res, i) => (
                            <li key={i} className="line-clamp-1">{res}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
