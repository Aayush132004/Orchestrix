import React from 'react'

interface LinkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const LinkButton = ({ children, onClick }: LinkButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-sm font-medium text-[#6b8c6b] hover:text-[#a3e635] transition-colors duration-200 cursor-pointer group"
    >
      {children}
    </button>
  )
}

export default LinkButton