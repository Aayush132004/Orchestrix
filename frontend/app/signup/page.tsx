"use client";
import React, { useState, useEffect } from "react";
import Appbar from "@/components/Appbar";
import CheckFeature from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username: email,
        password,
        name,
      });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0f0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#6b8c6b] text-sm font-semibold tracking-wider">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
      <Appbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">

        {/* Left Column: Marketing Pitch */}
        <div className="flex flex-col gap-8 max-w-md pr-4">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a3e635] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
              Free Forever
            </span>
            <h1 className="text-4xl md:text-5xl tracking-tight text-white leading-[1.15] font-bold">
              Automate your work with{" "}
              <span className="text-lime-gradient font-display italic">Orchestrix</span>.
            </h1>
            <p className="text-[#6b8c6b] text-lg leading-relaxed">
              Connect webhooks, build sequential multi-step orchests, and let powerful automations run your operations 24/7.
            </p>
          </div>

          <div className="space-y-3.5 mt-2 bg-[#111711] p-6 rounded-2xl border border-[rgba(163,230,53,0.1)]">
            <CheckFeature label="Visual sequential workflow builder — no code required" />
            <CheckFeature label="Free forever — core zaps and webhook triggers included" />
            <CheckFeature label="AI-powered step transformation and data processing" />
            <CheckFeature label="Instant email, HTTP and custom action integrations" />
          </div>
        </div>

        {/* Right Column: Signup Form */}
        <div className="bg-[#111711] border border-[rgba(163,230,53,0.12)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 md:p-10 max-w-md w-full flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a3e635] to-[#84cc16]"></div>
          <div className="absolute top-4 right-4 w-24 h-24 bg-[#a3e635] rounded-full opacity-5 blur-2xl pointer-events-none"></div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Create account</h2>
            <p className="text-sm text-[#4a6a4a] mt-1">Start automating in minutes. Free forever.</p>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800/50 text-red-400 px-4 py-3.5 rounded-xl text-sm font-medium flex gap-2.5 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-950/50 border border-green-800/50 text-green-400 px-4 py-3.5 rounded-xl text-sm font-medium flex gap-2.5 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Email Address"
              type="text"
              placeholder="you@domain.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-2 w-full flex flex-col gap-4">
            <PrimaryButton onClick={handleSubmit} size="big">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#0a0f0a] border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Get Started Free →"
              )}
            </PrimaryButton>

            <p className="text-center text-sm text-[#4a6a4a] font-medium">
              Already have an account?{" "}
              <a href="/login" className="text-[#a3e635] font-bold hover:text-[#bef264] transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}