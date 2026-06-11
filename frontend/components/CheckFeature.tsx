import React from 'react'

const CheckFeature = ({ label }: { label: string }) => {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-[#e8f0eb]/30 px-3 py-1.5 rounded-full border border-[#a3c4ab]/20">
      <div className="flex-shrink-0 text-[#4a7c59]">
        <CheckMark />
      </div>
      <span>{label}</span>
    </div>
  )
}

export default CheckFeature

function CheckMark() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2" 
      stroke="currentColor" 
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}