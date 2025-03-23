'use client'

import Logo from '../common/logo/Logo'

export interface AuthFormProps {
  title: string
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function AuthForm({ title, children, onSubmit }: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-2/3 flex-col items-center justify-center gap-2 rounded-lg bg-white shadow-2xl lg:w-1/3"
    >
      <Logo />
      <h3>{title}</h3>
      {children}
    </form>
  )
}
