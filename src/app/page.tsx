
"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/portfolio-service";
import type { PortfolioData } from "@/lib/portfolio-types";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MessageModal } from "@/components/MessageModal";
import { BackToTop } from "@/components/BackToTop";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchPortfolioData();
        setData(result);
        
        // Update browser title and favicon dynamically from "About" data
        if (result.about?.title) {
          document.title = result.about.title;
          
          // Update favicon to use profile image
          if (result.about.imageUrl) {
            let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (!link) {
              link = document.createElement('link');
              link.rel = 'icon';
              document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = result.about.imageUrl;
            // Also update apple-touch-icon for mobile devices
            let appleLink = document.querySelector("link[rel~='apple-touch-icon']") as HTMLLinkElement;
            if (!appleLink) {
              appleLink = document.createElement('link');
              appleLink.rel = 'apple-touch-icon';
              document.getElementsByTagName('head')[0].appendChild(appleLink);
            }
            appleLink.href = result.about.imageUrl;
          }
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary w-12 h-12" />
          <p className="text-primary font-medium animate-pulse">Memuat Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        logoTitle={data?.about?.title} 
        logoUrl={data?.about?.imageUrl}
        onOpenMessage={() => setIsMessageModalOpen(true)} 
      />
      
      <main className="flex-grow">
        <Hero 
          title={data?.home?.title} 
          subtitle={data?.home?.subtitle} 
          slides={data?.carousel} 
        />
        
        <About data={data?.about} />
        
        <Gallery items={data?.gallery} />
        
        <Contact data={data?.contact} />
      </main>

      <Footer 
        data={data?.footer} 
        ownerName={data?.about?.title} 
      />

      <MessageModal 
        isOpen={isMessageModalOpen} 
        onOpenChange={setIsMessageModalOpen} 
      />

      <BackToTop />
    </div>
  );
}
