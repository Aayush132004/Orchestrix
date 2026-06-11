"use client"
import React from 'react'
import { ReactNode } from 'react'

const PrimaryButton = ({children, onClick, size="small"}:{children:ReactNode, onClick:()=>void, size?:"big"|"small"}) => {
  return (
    <button 
      onClick={onClick} 
      className={`
        ${size === "small" ? "text-sm px-5 py-2.5" : "text-lg px-8 py-3.5"} 
        bg-gradient-to-r from-[#4a7c59] to-[#3d6b4a] text-white font-semibold rounded-xl
        shadow-[0_4px_12px_rgba(74,124,89,0.25)] hover:shadow-[0_6px_20px_rgba(74,124,89,0.35)]
        hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        transition-all duration-200 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 focus:ring-offset-2
        text-center inline-flex items-center justify-center gap-2
      `}
    >
      {children}
    </button>
  )
}

export default PrimaryButton