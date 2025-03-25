'use client'

import type { SignupFormData } from '@/schemas/signupSchema'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signupSchema } from '@/schemas/signupSchema'
import AuthForm from './AuthForm'
import Input from '../common/input/Input'
import Button from '../common/button/Button'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { API_ENDPOINTS, ROUTES } from '@/constants/routes'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/constants/toastMessages'
import { kyInstance } from '@/lib/kyInstance'
import { CreateUserDTO } from '@/types/dto/user'
import { useDuplicationCheck } from '@/hooks/useDuplicationCheck'
import { TABLES } from '@/constants/supabase'
import { SIGNUP_MESSAGE } from '@/constants/zod'

export default function SignupForm() {
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const router = useRouter()
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  })
  const supabase = createBrowserSupabaseClient()

  const {
    status: emailStatus,
    check: emailCheck,
    reset: emailReset,
  } = useDuplicationCheck(TABLES.USERS, 'email')
  const {
    status: nicknameStatus,
    check: nicknameCheck,
    reset: nicknameReset,
  } = useDuplicationCheck(TABLES.USERS, 'nickname')

  // nickname, email 업데이트 시 중복 검사 초기화
  useEffect(() => {
    nicknameReset()
  }, [methods.watch('nickname')])
  useEffect(() => {
    emailReset()
  }, [methods.watch('email')])

  const handleEmailCheck = async () => {
    methods.clearErrors('email')

    const isValid = await methods.trigger('email')
    if (!isValid) {
      methods.setError('email', {
        type: 'manual',
        message: SIGNUP_MESSAGE.EMAIL,
      })
      return
    }

    const emailInput = methods.getValues('email')
    if (!emailInput.trim()) {
      methods.setError('email', {
        type: 'manual',
        message: '이메일을 입력해주세요.',
      })
      return
    }

    const isAvailable = await emailCheck(emailInput)
    if (isAvailable) {
      toast.success(TOAST_MESSAGE.VALID.EMAIL_AVAILABLE)
    } else {
      toast.error(TOAST_MESSAGE.VALID.EMAIL_TAKEN)
    }
  }

  const handleNicknameCheck = async () => {
    methods.clearErrors('nickname')
    const isValid = await methods.trigger('nickname')
    if (!isValid) {
      methods.setError('nickname', {
        type: 'manual',
        message: SIGNUP_MESSAGE.NICKNAME,
      })
      return
    }
    const nicknameInput = methods.getValues('nickname')
    if (!nicknameInput.trim()) {
      methods.setError('nickname', {
        type: 'manual',
        message: '닉네임을 입력해주세요.',
      })
      return
    }

    const isAvailable = await nicknameCheck(nicknameInput)
    if (isAvailable) {
      toast.success(TOAST_MESSAGE.VALID.NICKNAME_AVAILABLE)
    } else {
      toast.error(TOAST_MESSAGE.VALID.NICKNAME_TAKEN)
    }
  }

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
        throw new Error(error.message)
      }
      if (data) {
        setIsEmailVerified(true)
      }

      if (data && data.user) {
        const { id } = data.user
        const payload: CreateUserDTO = {
          id,
          email,
          nickname,
        }
        await kyInstance.post(API_ENDPOINTS.CREATE_USER, {
          json: payload,
        })
      }
      return data
    },
    onSuccess: () => {
      toast.info(TOAST_MESSAGE.AUTH.SIGNUP_EMAIL_SENT)
      router.push(ROUTES.HOME)
    },
    onError: (error) => {
      console.error('회원가입 실패: ', error.message)
      if (error instanceof Error) {
        if (error.message === 'email rate limit exceeded') {
          toast.error(TOAST_MESSAGE.SYSTEM.TOO_MANY_REQUEST)
        } else {
          toast.error(TOAST_MESSAGE.AUTH.SIGNUP_FAILED)
        }
      }
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    if (!nicknameStatus.available) {
      toast.warn('닉네임 중복 확인이 필요합니다.')
      return
    }
    if (!emailStatus.available) {
      toast.warn('이메일 중복 확인이 필요합니다.')
      return
    }
    signupMutation.mutate({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    })
  })

  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={onSubmit}>
        <div className="flex w-full items-end gap-2 pl-12 pr-10">
          <Input name="email" label="이메일" className="flex-1" />
          <Button
            className={`w-14 bg-black text-xs text-white ${emailStatus.available && 'bg-mint-500'}`}
            onClick={handleEmailCheck}
          >
            {emailStatus.available ? <i className="fa-solid fa-check"></i> : '확인'}
          </Button>
        </div>
        <div className="flex w-full gap-2 pl-12 pr-10">
          <Input name="password" type="password" label="비밀번호" />
        </div>
        <div className="flex w-full gap-2 pl-12 pr-10">
          <Input name="passwordConfirm" type="password" label="비밀번호 확인" />
        </div>
        <div className="flex w-full items-end gap-2 pl-12 pr-10">
          <Input name="nickname" label="닉네임" />
          <Button
            className={`w-14 bg-black text-xs text-white ${nicknameStatus.available && 'bg-mint-500'}`}
            onClick={handleNicknameCheck}
          >
            {nicknameStatus.available ? <i className="fa-solid fa-check"></i> : '확인'}
          </Button>
        </div>

        <Button
          type="submit"
          className="!w-3/4 bg-mint-900 font-bold text-white"
          disabled={signupMutation.isPending}
        >
          {isEmailVerified ? '메일함을 확인해주세요' : '가입하기'}
        </Button>
      </AuthForm>
    </FormProvider>
  )
}
