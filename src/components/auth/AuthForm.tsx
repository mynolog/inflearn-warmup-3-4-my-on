'use client'

import Logo from '../common/logo/Logo'

export interface AuthFormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function AuthForm({ children, onSubmit }: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-2/3 flex-col items-center justify-center gap-3 rounded-sm bg-white p-10 shadow-2xl lg:w-1/3"
    >
      <Logo className="text-3xl text-mint-900" />
      {children}
    </form>
  )
}
