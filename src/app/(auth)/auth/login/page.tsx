import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인 · myOn',
  description: 'myOn에 로그인하고 나만의 순간을 기록하세요.',
}

export default function LoginPage() {
  return <div className="text-white">로그인 페이지</div>
}
