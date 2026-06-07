"use client"
//as using onClick so use client
import React from 'react'
import { ReactNode } from 'react'

const LinkButton = ({children,onClick}:{children:ReactNode,onClick:()=>void}) => {
  return (
    <button 
      className="px-4 py-2 text-sm font-medium text-slate-600 bg-transparent rounded-md cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 focus:outline-none text-left border-none" 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default LinkButton