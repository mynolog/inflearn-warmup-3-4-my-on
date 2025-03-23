'use client'

import type { SignupFormData } from '@/schemas/signupSchema'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '@/schemas/signupSchema'
import AuthForm from './AuthForm'
import Input from '../common/input/Input'
import Button from '../common/button/Button'

export default function SignupForm() {
  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  })

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <FormProvider {...methods}>
      <AuthForm onSubmit={onSubmit}>
        <Input name="email" label="이메일" />
        <Input name="password" type="password" label="비밀번호" />
        <Input name="passwordConfirm" type="password" label="비밀번호 확인" />
        <Input name="nickname" label="닉네임" />
        <Button type="submit" className="!w-3/4 !bg-mint-900 font-bold text-white">
          가입하기
        </Button>
      </AuthForm>
    </FormProvider>
  )
}
