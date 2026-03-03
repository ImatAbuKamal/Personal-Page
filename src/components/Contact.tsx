"use client";

import { Phone, Mail, MapPin } from "lucide-react";

interface ContactProps {
  data?: {
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
  };
}

export function Contact({ data }: ContactProps) {
  if (!data) return null;

  return (
    <section id="contact" className="@container py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl @md:text-4xl font-bold text-primary mb-12 text-center animate-in fade-in slide-in-from-bottom-5 duration-700">Contact Me</h2>
        
        <div className="grid grid-cols-1 @4xl:grid-cols-2 @6xl:grid-cols-5 gap-12">
          <div className="@4xl:col-span-1 @6xl:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
            <h3 className="text-2xl font-bold text-primary mb-4">Informasi Kontak</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 group transition-transform hover:translate-x-2 duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Telepon</h4>
                  <p className="text-muted-foreground">{data.phone || "-"}</p>
                </div>
              </div>

              <div className="flex gap-4 group transition-transform hover:translate-x-2 duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Email</h4>
                  <p className="text-muted-foreground">{data.email || "-"}</p>
                </div>
              </div>

              <div className="flex gap-4 group transition-transform hover:translate-x-2 duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Alamat</h4>
                  <p className="text-muted-foreground">{data.address || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="@4xl:col-span-1 @6xl:col-span-3 rounded-2xl overflow-hidden shadow-lg border border-border min-h-[400px] animate-in fade-in slide-in-from-right-10 duration-1000">
            {data.mapUrl ? (
              <iframe
                src={data.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                Peta tidak tersedia
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
