"use client"
import Image from "next/image";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Feature from "@/components/Feature";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  
  return (
    <div className="w-full text-slate-900">
      {/* Hero Section Container */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center">
        
        {/* Logo at landing page */}
        <div className="mb-8 flex items-center justify-center">
          <div className="p-4 bg-[#faf9f6]/95 border border-[#e8e4df] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.025)] hover:scale-105 hover:border-[#a3c4ab]/60 transition-all duration-300 select-none">
            <Image 
              src="/logo.png" 
              alt="Orchestrix Logo" 
              width={64} 
              height={64} 
              className="object-contain rounded-xl" 
              priority
            />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl tracking-tight text-slate-900 max-w-4xl text-center leading-[1.1] font-display font-semibold">
          Automate as fast as you can <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a]">think</span>
        </h1>
        
        {/* Subtitle / Description */}
        <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl text-center leading-relaxed">
          AI gives you automation superpowers, and Orchestrix puts them to work. 
          Pairing AI and Orchestrix helps you turn ideas into workflows and bots 
          that work for you.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="mt-10 flex items-center justify-center">
          <PrimaryButton onClick={() => {router.push("/signup")}} size="big">
            Get Started Free
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
}