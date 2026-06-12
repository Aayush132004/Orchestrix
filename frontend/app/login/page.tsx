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

        {/* Left Column: Feature Highlights */}
        <div className="flex flex-col gap-8 max-w-md pr-4">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a3e635] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"></span>
              Webhook-Powered Automation
            </span>
            <h1 className="text-4xl md:text-5xl tracking-tight text-white leading-[1.15] font-bold">
              Welcome back to{" "}
              <span className="text-lime-gradient font-display italic">Orchestrix</span>.
            </h1>
            <p className="text-[#6b8c6b] text-lg leading-relaxed">
              Sign in to manage your zaps, monitor live executions, and scale your webhook automations effortlessly.
            </p>
          </div>

          <div className="space-y-3.5 mt-2 bg-[#111711] p-6 rounded-2xl border border-[rgba(163,230,53,0.1)]">
            <CheckFeature label="Build sequential multi-step automation orchests" />
            <CheckFeature label="Real-time webhook trigger and action execution" />
            <CheckFeature label="AI-powered data transformation in your pipeline" />
            <CheckFeature label="Live execution logs and run history dashboard" />
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="bg-[#111711] border border-[rgba(163,230,53,0.12)] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 md:p-10 max-w-md w-full flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a3e635] to-[#84cc16]"></div>
          <div className="absolute top-4 right-4 w-24 h-24 bg-[#a3e635] rounded-full opacity-5 blur-2xl pointer-events-none"></div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Sign in</h2>
            <p className="text-sm text-[#4a6a4a] mt-1">Enter your credentials to access your dashboard.</p>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-800/50 text-red-400 px-4 py-3.5 rounded-xl text-sm font-medium flex gap-2.5 items-start">
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
                  <span>Signing in...</span>
                </div>
              ) : (
                "Launch Dashboard →"
              )}
            </PrimaryButton>

            <p className="text-center text-sm text-[#4a6a4a] font-medium">
              Don&apos;t have an account yet?{" "}
              <a href="/signup" className="text-[#a3e635] font-bold hover:text-[#bef264] transition-colors">
                Sign up free
              </a>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}