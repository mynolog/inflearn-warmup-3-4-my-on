import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'
import AuthSwitcher from '@/components/auth/AuthSwitcher'
import SocialLoginButtons from '@/components/auth/SocialLoginButtons'
import AuthPageWrapper from '@/components/transition/AuthTransitionWrapper'

export const metadata: Metadata = {
  title: '로그인 · myOn',
  description: 'myOn에 로그인하고 나만의 순간을 기록하세요.',
}

export default function LoginPage() {
  return (
    <AuthPageWrapper>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
        <LoginForm />
        <SocialLoginButtons />
        <AuthSwitcher to="signup" />
      </div>
    </AuthPageWrapper>
  )
}
