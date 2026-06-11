"use client"
import Appbar from "@/components/Appbar";
import Hero from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col justify-between">
      <div>
        <Appbar />
        
        {/* Wrapped everything inside a structural main element */}
        <main className="w-full flex flex-col items-center">
          <Hero />
          <HeroVideo />
        </main>
      </div>

      <footer className="w-full border-t border-[#e8e4df]/60 bg-[#faf9f6]/80 py-8 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Orchestrix Logo" width={24} height={24} className="object-contain" />
            <span className="font-semibold text-slate-800">Orchestrix</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-slate-600">
            Made with ❤️ in 🇮🇳
          </div>
          <div>
            © {new Date().getFullYear()} Orchestrix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}