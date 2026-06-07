"use client"
import React from 'react'
import { ReactNode } from 'react'

const DarkButton = ({
  children,
  onClick,
  size = "small"
}: {
  children: ReactNode,
  onClick: () => void,
  size?: "big" | "small"
}) => {
  return (
    <button 
      onClick={onClick} 
      className={`
        ${size === "small" ? "text-sm px-5 py-2" : "text-xl px-10 py-4"} 
        bg-violet-700 text-white font-medium rounded-lg shadow-sm 
        hover:bg-violet-800 transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
        text-center inline-flex items-center justify-center
      `}
    >
      {children}
    </button>
  )
}

export default DarkButton;