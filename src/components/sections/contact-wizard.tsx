"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitContactForm } from "@/app/actions/submit-contact";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { House, Buildings, Storefront, Briefcase, Martini, CheckCircle, WhatsappLogo, CaretRight, CaretLeft } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { SiteSetting } from "@prisma/client";

const projectTypes = [
  { id: "Hunian", label: "Hunian Pribadi", icon: House },
  { id: "Apartemen", label: "Apartemen", icon: Buildings },
  { id: "Kafe/Retail", label: "Kafe / Retail", icon: Storefront },
  { id: "Kantor", label: "Kantor", icon: Briefcase },
  { id: "Hospitality", label: "Hospitality", icon: Martini },
];

const interiorStyles = [
  { id: "Modern", label: "Modern" },
  { id: "Minimalis", label: "Minimalis" },
  { id: "Japandi", label: "Japandi" },
  { id: "Skandinavia", label: "Skandinavia" },
  { id: "Industrial", label: "Industrial" },
  { id: "Klasik", label: "Klasik Modern" },
];

const totalSteps = 4;

export function ContactWizard({ settings }: { settings: SiteSetting }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Partial wizard state
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const { register, handleSubmit, formState: { errors }, trigger, getValues, setValue } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      message: "",
      projectType: "",
      style: "",
      estimatedArea: "",
    },
  });

  const nextStep = async () => {
    if (step === 3) {
      const isValid = await trigger(["name", "email", "location", "message"]);
      if (!isValid) return;
    }
    if (step === 2 && !getValues("message")) {
       const styleText = selectedStyle ? `dengan gaya ${selectedStyle}` : "yang sesuai";
       const autoMsg = `Saya ingin konsultasi desain interior untuk proyek ${selectedType} ${styleText}. Mohon hubungi saya untuk diskusi lebih lanjut mengenai kebutuhan proyek ini.`;
       setValue("message", autoMsg);
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleFormSubmit = async () => {
    const values = getValues();
    values.projectType = selectedType;
    values.style = selectedStyle;
    
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    try {
      const result = await submitContactForm(formData);
      if (!result.success) {
        toast.error(result.error || "Gagal mengirim pesan.");
      } else {
        toast.success("Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.");
        setStep(1); // reset or go to success state
      }
    } catch (e) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsappSubmit = () => {
    const v = getValues();
    const text = `Halo Mawmaw Interior, saya ingin konsultasi proyek desain.
    
*Jenis Proyek:* ${selectedType}
*Style Favorit:* ${selectedStyle || '-'}
*Estimasi Luas:* ${v.estimatedArea || '-'}
*Lokasi:* ${v.location}

*Nama:* ${v.name}
*Pesan Singkat:* ${v.message}
    `;
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="glass-dark contact-form-card relative overflow-hidden flex flex-col min-h-[500px]">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div 
              className="h-full bg-gold-500 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: step > i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            {/* Step 1: Project Type */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Pilih Jenis Proyek</h3>
                  <p className="text-white/60 text-sm">Apa jenis ruangan yang ingin Anda desain?</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all text-center",
                        selectedType === type.id
                          ? "border-gold-500 bg-gold-500/10 text-gold-300"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:border-white/20"
                      )}
                    >
                      <type.icon weight={selectedType === type.id ? "fill" : "duotone"} className="w-8 h-8" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Style */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Preferensi Style</h3>
                  <p className="text-white/60 text-sm">Pilih gaya desain yang paling Anda sukai.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interiorStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={cn(
                        "flex flex-col p-4 rounded-xl border transition-all text-left relative overflow-hidden",
                        selectedStyle === style.id
                          ? "border-gold-500 bg-gold-500/10 text-gold-300"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:border-white/20"
                      )}
                    >
                      <span className="text-sm font-medium relative z-10">{style.label}</span>
                      {selectedStyle === style.id && (
                        <CheckCircle weight="fill" className="absolute top-4 right-4 w-5 h-5 text-gold-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Details Form */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Detail Singkat</h3>
                  <p className="text-white/60 text-sm">Ceritakan sedikit tentang proyek dan diri Anda.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1 block">Nama</label>
                    <Input variant="inverse" placeholder="Nama Anda" {...register("name")} className={errors.name ? "border-red-400" : ""} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1 block">Email</label>
                    <Input variant="inverse" type="email" placeholder="Alamat email" {...register("email")} className={errors.email ? "border-red-400" : ""} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1 block">Lokasi Proyek</label>
                    <Input variant="inverse" placeholder="Kota / Daerah" {...register("location")} className={errors.location ? "border-red-400" : ""} />
                    {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1 block">Estimasi Luas (opsional)</label>
                    <Input variant="inverse" placeholder="Misal: 45 m²" {...register("estimatedArea")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1 block">Pesan</label>
                    <Textarea variant="inverse" placeholder="Jelaskan kebutuhan Anda..." {...register("message")} className={errors.message ? "border-red-400" : ""} />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">Rangkuman Proyek</h3>
                  <p className="text-white/60 text-sm">Periksa kembali data Anda sebelum mengirim.</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-5 space-y-3 text-sm text-white/80 border border-white/10">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Jenis Proyek</span>
                    <span className="font-medium text-white">{selectedType}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Style Preferensi</span>
                    <span className="font-medium text-white">{selectedStyle || '-'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Nama & Kontak</span>
                    <span className="font-medium text-white text-right">{getValues("name")}<br/><span className="text-xs text-white/60">{getValues("email")}</span></span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-white/50">Lokasi</span>
                    <span className="font-medium text-white">{getValues("location")}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-4">
                  <Button variant="primary" radius="pill" className="w-full text-forest-900 bg-white hover:bg-white/90" onClick={handleFormSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                  <Button variant="gold" radius="pill" className="w-full" onClick={handleWhatsappSubmit} disabled={isSubmitting}>
                    <WhatsappLogo weight="fill" className="w-5 h-5 mr-2" />
                    Kirim via WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/10">
        {step > 1 ? (
          <Button variant="ghost" size="sm" onClick={prevStep} className="text-white/60 hover:text-white">
            <CaretLeft className="w-4 h-4 mr-1" /> Kembali
          </Button>
        ) : <div />}
        
        {step < totalSteps && (
          <Button 
            variant="gold" 
            size="sm" 
            onClick={nextStep} 
            disabled={step === 1 && !selectedType}
            className="px-6 rounded-pill"
          >
            Lanjut <CaretRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
