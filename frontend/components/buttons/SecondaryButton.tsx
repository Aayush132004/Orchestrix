"use client"
import React from 'react'
import { ReactNode } from 'react'

const SecondaryButton = ({children,onClick,size="small"}:{children:ReactNode,onClick:()=>void,size?:"big"|"small"}) => {
  return (
    <button 
      onClick={onClick} 
      className={`
        ${size === "small" ? "text-sm px-5 py-2" : "text-xl px-10 py-4"} 
        text-amber-700 bg-transparent font-medium rounded-full border border-amber-700
        cursor-pointer transition-all duration-200 
        hover:bg-amber-50 focus:outline-none 
        text-center inline-flex items-center justify-center
      `}
    >
      {children}
    </button>
  )
}

export default SecondaryButton