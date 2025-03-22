'use client'

interface ButtonProps {
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  type = 'button',
  className = '',
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`w-32 h-10 bg-white rounded-lg font-bold shadow-lg transition-hover hover:translate-y-[-2px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
