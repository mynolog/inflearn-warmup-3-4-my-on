import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: '로그인 · myOn',
  description: 'myOn에 로그인하고 나만의 순간을 기록하세요.',
}

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <LoginForm title="로그인" />
    </div>
  )
}
