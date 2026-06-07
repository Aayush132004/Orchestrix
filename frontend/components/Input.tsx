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
      {/* Input Label */}
      <label className="text-sm font-medium text-slate-700 tracking-tight">
        {label}
      </label>
      
    
      <input 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange}
        className="w-full px-3.5 py-2 text-sm bg-white text-slate-900 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-700 transition-all duration-150 shadow-sm"
      />
    </div>
  )
}