'use client'

import type { LoginFormData } from '@/schemas/loginSchema'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema'
import AuthForm from './AuthForm'
import Input from '../common/input/Input'
import Button from '../common/button/Button'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { ROUTES } from '@/constants/routes'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/constants/toastMessages'
import { SUPABASE_ERROR_MESSAGE } from '@/constants/error'

export default function LoginForm() {
  const router = useRouter()
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  })

  const supabase = createBrowserSupabaseClient()

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }
      return data
    },
    onSuccess: async () => {
      toast.success(TOAST_MESSAGE.AUTH.LOGIN_SUCCESS)
      router.push(ROUTES.HOME)
    },
    onError: (error) => {
      console.error('[Email Login Error]: ', error.message, error)
      if (error instanceof Error) {
        if (error.message === SUPABASE_ERROR_MESSAGE.EMAIL_NOT_CONFIRMED) {
          toast.warning(TOAST_MESSAGE.AUTH.EMAIL_NOT_VERIFIED)
        } else if (error.message === SUPABASE_ERROR_MESSAGE.INVALID_LOGIN_CREDENTIALS) {
          toast.error(TOAST_MESSAGE.AUTH.LOGIN_FAILED)
        } else {
          toast.error(TOAST_MESSAGE.AUTH.UNKNWON_ERROR)
        }
      }
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    })
  })

  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={onSubmit}>
        <Input name="email" label="이메일" />
        <Input type="password" name="password" label="비밀번호" />
        <Button
          type="submit"
          className="!w-3/4 !bg-mint-900 font-bold text-white"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? '로그인 중' : '로그인'}
        </Button>
      </AuthForm>
    </FormProvider>
  )
}
