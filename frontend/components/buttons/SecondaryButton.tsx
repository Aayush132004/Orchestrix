import React from 'react'

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'big';
}

const SecondaryButton = ({ children, onClick, size = 'small' }: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-semibold rounded-xl border border-[rgba(163,230,53,0.2)] text-[#a3e635] hover:bg-[rgba(163,230,53,0.08)] hover:border-[rgba(163,230,53,0.4)] transition-all duration-200 cursor-pointer ${size === 'big' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'}`}
    >
      {children}
    </button>
  )
}

export default SecondaryButton