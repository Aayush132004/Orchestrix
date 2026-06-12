"use client"
import Appbar from "@/components/Appbar";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
      <Appbar />
      <LandingPage />
    </div>
  );
}