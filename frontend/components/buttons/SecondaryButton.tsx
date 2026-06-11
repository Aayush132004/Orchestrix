"use client"
import React from 'react'
import { ReactNode } from 'react'

const SecondaryButton = ({children, onClick, size="small"}:{children:ReactNode, onClick:()=>void, size?:"big"|"small"}) => {
  return (
    <button 
      onClick={onClick} 
      className={`
        ${size === "small" ? "text-sm px-5 py-2.5" : "text-lg px-8 py-3.5"} 
        text-slate-700 bg-white font-semibold rounded-xl border border-[#e8e4df]
        shadow-sm hover:bg-[#e8f0eb]/20 hover:text-[#3d6b4a] hover:border-[#a3c4ab]/50
        hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        transition-all duration-200 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/20
        text-center inline-flex items-center justify-center gap-2
      `}
    >
      {children}
    </button>
  )
}

export default SecondaryButton