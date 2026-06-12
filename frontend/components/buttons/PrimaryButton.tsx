import React from 'react'

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'big';
  disabled?: boolean;
}

const PrimaryButton = ({ children, onClick, size = 'small', disabled }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        btn-lime font-bold tracking-tight cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${size === 'big' ? 'px-7 py-3.5 text-base rounded-2xl' : 'px-4 py-2 text-sm rounded-xl'}
      `}
    >
      {children}
    </button>
  )
}

export default PrimaryButton