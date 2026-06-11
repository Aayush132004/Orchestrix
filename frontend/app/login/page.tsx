"use client";
import React, { useState, useEffect } from "react";
import Appbar from "@/components/Appbar";
import CheckFeature from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username: email,
        password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      } else {
        setError(res.data.message || "Invalid response from server.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Failed to sign in. Please verify your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#4a7c59] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm font-semibold tracking-wider">Securing connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col">
      <Appbar />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
        
        {/* Left Column: Brand Marketing Pitch */}
        <div className="flex flex-col gap-8 max-w-md pr-4">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d5a3d] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] animate-pulse"></span>
              Secure Gateway
            </span>
            <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900 leading-[1.15] font-display font-semibold">
              Welcome back to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a]">Orchestrix</span>.
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Sign in to manage your workflows, monitor native automations, and scale operations effortlessly.
            </p>
          </div>
          
          <div className="space-y-3.5 mt-2 bg-white/40 p-6 rounded-2xl border border-[#e8e4df]">
            <CheckFeature label="Access custom analytics and dashboard" />
            <CheckFeature label="Enterprise-grade secure API connection" />
            <CheckFeature label="Native 24/7 background task executor" />
          </div>
        </div>

        {/* Right Column: Premium Form Card */}
        <div className="bg-white border border-[#e8e4df]/60 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10 max-w-md w-full flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a]"></div>
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in</h2>
            <p className="text-sm text-slate-400 mt-1">Enter details to launch your control room.</p>
          </div>

          {error && (
            <div className="bg-red-50/70 border border-red-200/50 text-red-700 px-4 py-3.5 rounded-xl text-sm font-medium flex gap-2.5 items-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <Input 
              label="Email Address" 
              type="text" 
              placeholder="you@domain.com" 
              onChange={(e) => setEmail(e.target.value)} 
            />
            
            <div className="flex flex-col gap-1.5">
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <div className="text-right">
                <a href="#" className="text-xs text-[#4a7c59] hover:text-[#3d6b4a] font-semibold hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div className="mt-2 w-full flex flex-col gap-4">
            <PrimaryButton onClick={handleSubmit} size="big">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Launch Dashboard"
              )}
            </PrimaryButton>
            
            <p className="text-center text-sm text-slate-500 font-medium">
              Don't have an account yet?{" "}
              <a href="/signup" className="text-[#4a7c59] font-bold hover:text-[#3d6b4a] hover:underline transition-colors">
                Sign up free
              </a>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}