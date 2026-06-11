"use client"
import React, { ChangeEvent } from 'react'

interface InputProps {
  label: string;
  placeholder: string;
  type?: 'text' | 'password';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, placeholder, onChange, type = 'text' }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      
      <input 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange}
        className="w-full px-4 py-3 text-sm bg-slate-50/50 text-slate-900 border border-slate-200/80 rounded-xl placeholder-slate-400/80 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4a7c59]/10 focus:border-[#4a7c59] transition-all duration-200 shadow-sm"
      />
    </div>
  )
}