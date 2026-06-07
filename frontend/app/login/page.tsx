"use client";
import React, { useState } from "react";
import Appbar from "@/components/Appbar";
import CheckFeature from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Login() {
  const router=useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Appbar />
      
      {/* Structural Two-Column Main Layout */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Brand Marketing Pitch */}
        <div className="flex flex-col gap-6 max-w-md">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Welcome back to Orchestrix.
          </h1>
          <p className="text-slate-500 text-lg">
            Log in to manage your workflows, monitor your native automations, and keep your business moving seamlessly.
          </p>
          
          <div className="flex flex-col gap-3 items-start mt-2">
            <CheckFeature label="Access your custom dashboards" />
            <CheckFeature label="Secure end-to-end encrypted integration" />
            <CheckFeature label="24/7 automated task execution" />
          </div>
        </div>

        {/* Right Column: Premium Form Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col gap-5">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-sm text-slate-400 mt-1">Enter your details to continue your work.</p>
          </div>
          
          <Input 
            label="Email" 
            type="text" 
            placeholder="Your Email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <div className="flex flex-col gap-1">
            <Input 
              label="Password" 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <div className="text-right">
              <a href="#" className="text-xs text-indigo-600 hover:underline font-medium">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="mt-4 w-full flex flex-col gap-4">
            <PrimaryButton onClick={async () => {
              const res=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
               username:email,
               password,
              })
              localStorage.setItem("token",res.data.token);
              router.push("/dashboard")
            }} size="big">
              Sign in
            </PrimaryButton>
            
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}