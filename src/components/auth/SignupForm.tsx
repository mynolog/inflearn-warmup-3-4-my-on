'use client'

import type { SignupFormData } from '@/schemas/signupSchema'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signupSchema } from '@/schemas/signupSchema'
import AuthForm from './AuthForm'
import Input from '../common/input/Input'
import Button from '../common/button/Button'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

export default function SignupForm() {
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  })

  const supabase = createBrowserSupabaseClient()

  const signupMutation = useMutation({
    mutationFn: async ({ email, password, nickname }: Omit<SignupFormData, 'passwordConfirm'>) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
          data: {
            nickname,
          },
        },
      })

      if (error) {
        console.error(error)
      }

      if (data) {
        setIsEmailVerified(true)
      }
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    signupMutation.mutate({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    })
  })

  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={onSubmit}>
        <Input name="email" label="이메일" />
        <Input name="password" type="password" label="비밀번호" />
        <Input name="passwordConfirm" type="password" label="비밀번호 확인" />
        <Input name="nickname" label="닉네임" />
        <Button type="submit" className="!w-3/4 !bg-mint-900 font-bold text-white">
          {isEmailVerified ? '메일함을 확인해주세요' : '가입하기'}
        </Button>
      </AuthForm>
    </FormProvider>
  )
}
