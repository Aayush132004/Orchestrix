"use client"
import React, { useState } from "react";
import Appbar from "@/components/Appbar";
import CheckFeature from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function Signup() {
  const [name, setName] = useState("");
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
            Join millions worldwide who automate their work using Orchestrix.
          </h1>
          
          <div className="flex flex-col gap-3 items-start">
            <CheckFeature label="Easy setup, no coding required" />
            <CheckFeature label="Free forever for core features" />
            <CheckFeature label="14-day trial of premium features & apps" />
          </div>
        </div>

        {/* Right Column: Premium Form Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col gap-5">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-900">Create your account</h2>
            <p className="text-sm text-slate-400 mt-1">Get started with native automation today.</p>
          </div>

          <Input 
            label="Name" 
            type="text" 
            placeholder="Your name" 
            onChange={(e) => setName(e.target.value)} 
          />
          
          <Input 
            label="Email" 
            type="text" 
            placeholder="Your Email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <Input 
            label="Password" 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div className="mt-4 w-full flex flex-col">
            <PrimaryButton onClick={() => console.log({ name, email, password })} size="big">
              Sign up
            </PrimaryButton>
          </div>
        </div>

      </main>
    </div>
  );
}