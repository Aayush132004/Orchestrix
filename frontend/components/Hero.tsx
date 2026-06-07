"use client"
import Appbar from "@/components/Appbar";
import Image from "next/image";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Feature from "@/components/Feature";
import { useRouter } from "next/navigation";
export default function Hero() {
  const router=useRouter();
  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* Hero Section Container */}
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center">
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-3xl text-center leading-tight">
          Automate as fast as you can <span className="text-slate-900">type</span>
        </h1>
        
        {/* Subtitle / Description */}
        <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl text-center leading-relaxed">
          AI gives you automation superpowers, and Orchestrix puts them to work. 
          Pairing AI and Orchestrix helps you turn ideas into workflows and bots 
          that work for you.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <PrimaryButton onClick={() => {router.push("/signup")}} size="big">
            Get Started Free
          </PrimaryButton>
          <SecondaryButton onClick={() => {}} size="big">
            Contact Sales
          </SecondaryButton>
        </div>

        {/* Features Grid Section */}
        <div className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature 
            title="Free Forever" 
            subtitle="Get access to all core automation tools without paying a dime." 
          />
          <Feature 
            title="More Apps" 
            subtitle="Connect to your favorite tools. More integrations than any other platform." 
          />
          <Feature 
            title="Cutting Edge" 
            subtitle="Supercharge workflows with advanced, context-aware AI features." 
          />
        </div>

      </main>
    </div>
  );
}