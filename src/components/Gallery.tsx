
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GalleryProps {
  items?: Array<{
    title: string;
    imageUrl: string;
    learned: string[];
    results: string[];
  }>;
}

export function Gallery({ items = [] }: GalleryProps) {
  return (
    <section id="gallery" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">My Projects</h2>
        
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">Belum ada project yang ditampilkan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <Card key={index} className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="project design"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{item.title}</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Teknologi</span>
                      <div className="flex flex-wrap gap-2">
                        {item.learned?.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10 border-none rounded-md">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Hasil Utama</span>
                      <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                        {item.results?.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
