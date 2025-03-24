'use client'

interface ButtonProps {
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  children,
  type = 'button',
  className = '',
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`h-10 w-32 rounded-lg bg-white font-bold shadow-lg transition-hover hover:translate-y-[-2px] ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
