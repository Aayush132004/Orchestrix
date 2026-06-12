import React from 'react'

interface DarkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DarkButton = ({ children, onClick }: DarkButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-[rgba(163,230,53,0.1)] border border-[rgba(163,230,53,0.2)] text-[#a3e635] hover:bg-[rgba(163,230,53,0.18)] hover:border-[rgba(163,230,53,0.4)] hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] transition-all duration-200 cursor-pointer"
    >
      {children}
    </button>
  )
}

export default DarkButton