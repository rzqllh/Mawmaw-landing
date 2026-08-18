"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: typeof initialState, formData: FormData) => {
      const res = await login(formData);
      if (res?.error) {
        return { error: res.error };
      }
      return { error: "" };
    },
    initialState
  );

  return (
    <div className="flex min-h-dvh bg-bg-base">
      
      {/* Left Column - Form */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10">
        
        <Link href="/" className="absolute top-8 left-8 sm:left-16 lg:left-24 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-forest-900/5 text-forest-900 flex items-center justify-center border border-forest-900/10 group-hover:bg-forest-900/10 transition-colors">
            <span className="font-serif font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-medium text-forest-900 tracking-tight">Mawmaw.</span>
        </Link>

        <div className="w-full max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out mt-12">
          
          <div className="mb-10">
            <h1 className="font-serif text-4xl lg:text-5xl font-medium text-forest-900 tracking-tight mb-3">Welcome Back</h1>
            <p className="text-forest-700/70 tracking-wide text-sm font-medium">
              Masuk untuk mengelola portfolio dan konten studio.
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-forest-900/50 mb-1.5 ml-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@mawmaw.com"
                  required
                  autoComplete="email"
                  className="w-full min-h-12 rounded-xl bg-forest-900/5 border border-transparent px-4 py-3 text-sm text-forest-900 placeholder:text-forest-900/55 transition-all hover:bg-forest-900/10 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 focus:outline-none"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-widest text-forest-900/50 mb-1.5 ml-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full min-h-12 rounded-xl bg-forest-900/5 border border-transparent px-4 py-3 text-sm text-forest-900 placeholder:text-forest-900/55 transition-all hover:bg-forest-900/10 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 focus:outline-none"
                />
              </div>
            </div>

            {state?.error && (
              <div className="p-4 flex items-start gap-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-xl font-medium mt-4">
                <div className="mt-0.5 font-bold">X</div>
                <div>{state.error}</div>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full shadow-xl shadow-forest-900/10"
                size="lg"
                disabled={isPending}
              >
                {isPending ? "Otentikasi..." : "Login"}
              </Button>
            </div>
          </form>

        </div>
      </div>

      {/* Right Column - Image & Glass */}
      <div className="hidden md:flex flex-1 p-6 pl-0 relative">
        <div className="w-full h-full relative rounded-[2.5rem] overflow-hidden isolate shadow-2xl">
          {/* Beautiful Interior Image */}
          <Image 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
            alt="Premium Interior"
            fill
            className="object-cover"
            priority
          />
          
          {/* Liquid Glass Overlay matching the reference vibe */}
          <div className="absolute inset-0 bg-forest-900/10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 via-forest-900/10 to-transparent"></div>

          {/* Liquid Glass Element in the bottom corner */}
          <div className="absolute bottom-10 left-10 right-10 lg:left-12 lg:right-12">
            <div className="admin-surface rounded-3xl p-8 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/5 border border-forest-900/10 text-forest-900 text-xs font-bold uppercase tracking-widest mb-4">
                <ShieldCheck weight="fill" className="w-4 h-4 text-gold-500" />
                Secure Workspace
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif text-forest-900 leading-snug">
                Orchestrate your interior <br/> masterpieces from here.
              </h2>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
