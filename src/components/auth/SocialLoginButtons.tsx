'use client'

import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import Button from '../common/button/Button'

export default function SocialLoginButtons() {
  const supabase = createBrowserSupabaseClient()

  const signWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/oauth/kakao/callback`
          : 'http://localhost:3000/auth/oauth/kakao/callback',
      },
    })
  }

  const handleSignWithKakaoClick = () => {
    signWithKakao()
  }
  return (
    <div className="flex w-full max-w-[530px] flex-col items-center justify-center gap-3 bg-white p-5 text-sm sm:w-2/3 xl:w-1/3">
      <Button
        className="flex !w-3/4 items-center justify-center gap-2 !bg-kakao-container"
        onClick={handleSignWithKakaoClick}
      >
        <i className="fa-solid fa-comment text-kakao-symbol"></i>
        <span className="text-kakao-label">Kakao로 시작하기</span>
      </Button>
      <Button className="flex !w-3/4 items-center justify-center gap-2 !bg-google-container">
        <i className="fa-brands fa-google text-google-symbol"></i>
        <span className="text-google-label">Google로 시작하기</span>
      </Button>
    </div>
  )
}
