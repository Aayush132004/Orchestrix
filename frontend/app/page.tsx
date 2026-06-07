"use client"
import Appbar from "@/components/Appbar";
import Hero from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo"; // Added the missing import
import Image from "next/image";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Appbar />
      
      {/* Wrapped everything inside a structural main element */}
      <main className="w-full flex flex-col items-center">
        <Hero />
        <HeroVideo />
      </main>
    </div>
  );
}