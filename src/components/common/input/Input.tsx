'use client'

import { useFormContext } from 'react-hook-form'

interface InputProps {
  name: string
  label?: string
  type?: 'text' | 'password'
  autoComplete?: 'current-password'
  className?: string
}

export default function Input({
  name,
  label,
  type = 'text',
  autoComplete = 'current-password',
  className = '',
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string | undefined

  return (
    <div className="flex w-3/4 flex-col gap-2">
      {label && (
        <div className="flex items-center gap-1">
          <label className="text-[0.7rem] font-extrabold" htmlFor={name}>
            {label}
          </label>
          {error && (
            <p className="animate-shake text-[0.55rem] font-semibold text-red-500">{error}</p>
          )}
        </div>
      )}
      <input
        type={type}
        id={name}
        {...register(name)}
        className={`rounded-lg border p-3 text-xs font-extrabold outline-none transition-all duration-150 ease-in-out focus:shadow-md ${className}`}
        autoComplete={autoComplete}
      />
    </div>
  )
}
