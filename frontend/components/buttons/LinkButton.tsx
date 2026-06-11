"use client"
import React from 'react'
import { ReactNode } from 'react'

const LinkButton = ({children, onClick}:{children:ReactNode, onClick:()=>void}) => {
  return (
    <button 
      className="px-4 py-2 text-sm font-semibold text-slate-600 bg-transparent rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#e8f0eb]/40 hover:text-[#3d6b4a] focus:outline-none border-none active:scale-[0.98]" 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default LinkButton