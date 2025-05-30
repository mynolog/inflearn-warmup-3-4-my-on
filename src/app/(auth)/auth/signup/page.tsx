import { Metadata } from 'next'
import SignupForm from '@/components/auth/SignupForm'
import AuthSwitcher from '@/components/auth/AuthSwitcher'
import AuthPageWrapper from '@/components/transition/AuthTransitionWrapper'
import SocialLoginButtons from '@/components/auth/SocialLoginButtons'

export const metadata: Metadata = {
  title: '회원가입 · myOn',
  description: '나를 켜는 순간, myOn에서 시작하세요.',
}

export default function SignupPage() {
  return (
    <AuthPageWrapper>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
        <SignupForm />
        <SocialLoginButtons />
        <AuthSwitcher to="login" />
      </div>
    </AuthPageWrapper>
  )
}
