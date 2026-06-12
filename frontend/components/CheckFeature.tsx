import React from 'react'

const CheckFeature = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-[rgba(163,230,53,0.15)] border border-[rgba(163,230,53,0.3)] flex items-center justify-center shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#a3e635" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <span className="text-sm text-[#9ca3a0]">{label}</span>
    </div>
  )
}

export default CheckFeature