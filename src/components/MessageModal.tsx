
"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitMessage } from "@/lib/portfolio-service";

const formSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().regex(/^\+[1-9]\d{0,2}[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/, "Nomor telepon harus diawali kode negara (+62)"),
  subject: z.string().min(3, "Subjek wajib diisi"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  photo: z.any()
});

interface MessageModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MessageModal({ isOpen, onOpenChange }: MessageModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    }
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const photoFile = values.photo?.[0];
    if (!photoFile) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Silakan upload foto terlebih dahulu!' });
      return;
    }

    if (photoFile.size > 2 * 1024 * 1024) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Ukuran foto maksimal 2MB' });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new URLSearchParams();
      payload.append("name", values.name);
      payload.append("email", values.email);
      payload.append("phone", values.phone);
      payload.append("subject", values.subject);
      payload.append("message", values.message);

      const base64 = await fileToBase64(photoFile);
      payload.append("photo", base64);
      payload.append("photoName", photoFile.name);
      payload.append("photoType", photoFile.type);

      const result = await submitMessage(payload);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: result.message || "Pesan Anda telah terkirim.",
          confirmButtonColor: '#575785',
        });
        onOpenChange(false);
        form.reset();
        setPreview(null);
      } else {
        throw new Error(result.message || "Gagal mengirim pesan");
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Terjadi kesalahan saat mengirim pesan.",
        confirmButtonColor: '#575785',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Kirim Pesan</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap *</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="email@contoh.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon *</FormLabel>
                    <FormControl>
                      <Input placeholder="+62 812 3456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjek *</FormLabel>
                    <FormControl>
                      <Input placeholder="Subjek pesan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tulis pesan Anda..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Upload Foto (max 2MB, JPG/PNG) *</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setPreview(ev.target?.result as string);
                          reader.readAsDataURL(file);
                          onChange(e.target.files);
                        }
                      }}
                      {...fieldProps}
                    />
                  </FormControl>
                  {preview && (
                    <div className="mt-4 relative w-32 h-32 rounded-lg overflow-hidden border">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="rounded-full"
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-8"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
