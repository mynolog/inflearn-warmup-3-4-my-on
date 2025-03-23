'use client'

import type { AuthFormProps } from './AuthForm'
import AuthForm from './AuthForm'

type LoginFormProps = Omit<AuthFormProps, 'children'>

export default function LoginForm({ title, onSubmit }: LoginFormProps) {
  return (
    <AuthForm title={title} onSubmit={onSubmit}>
      <input />
      <input />
    </AuthForm>
  )
}
