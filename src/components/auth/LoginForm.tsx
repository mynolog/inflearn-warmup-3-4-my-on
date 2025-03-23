'use client'

import type { LoginFormData } from '@/schemas/loginSchema'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import AuthForm from './AuthForm'
import Input from '../common/input/Input'
import Button from '../common/button/Button'

export default function LoginForm() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={onSubmit}>
        <Input name="email" label="이메일" />
        <Input type="password" name="password" label="비밀번호" />
        <Button type="submit" className="!w-3/4 !bg-mint-900 font-bold text-white">
          로그인
        </Button>
      </AuthForm>
    </FormProvider>
  )
}
