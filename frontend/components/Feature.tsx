import React from 'react'

const Feature = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
      {/* Icon Container */}
      <div className="flex-shrink-0 p-2 bg-amber-50 rounded-lg text-amber-700">
        <Check />
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-slate-900">
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default Feature

function Check() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth="2" 
      stroke="currentColor" 
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}