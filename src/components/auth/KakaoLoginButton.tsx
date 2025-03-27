'use client'

import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import Button from '../common/button/Button'

interface StartWithKakakoButtonProps {
  className?: string
}

export default function StartWithKakaoButton({ className = '' }: StartWithKakakoButtonProps) {
  const supabase = createBrowserSupabaseClient()

  const signWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        //TODO: kakao callback url 환경 변수로 관리
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/oauth/kakao/callback`
          : 'http://localhost:3000/auth/oauth/kakao/callback',
      },
    })
  }

  const handleSignWithKakao = () => {
    signWithKakao()
  }

  return (
    <Button
      className={`flex !w-3/4 items-center justify-center gap-2 !bg-kakao-container ${className}`}
      onClick={handleSignWithKakao}
    >
      <i className="fa-solid fa-comment text-kakao-symbol"></i>
      <span className="text-kakao-label">카카오로 시작하기</span>
    </Button>
  )
}
