'use client'

import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import Button from '../common/button/Button'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/constants/toastMessages'
import { CONFIG_ERROR } from '@/constants/error'

interface StartWithKakakoButtonProps {
  className?: string
}

export default function StartWithKakaoButton({ className = '' }: StartWithKakakoButtonProps) {
  const supabase = createBrowserSupabaseClient()

  const signWithKakao = async () => {
    const kakaoCallbackPath = process.env.NEXT_PUBLIC_KAKAO_CALLBACK_PATH
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL

    if (!kakaoCallbackPath) {
      throw new Error(CONFIG_ERROR.MISSING_KAKAO_CALLBACK_PATH.message)
    }
    if (!baseUrl) {
      throw new Error(CONFIG_ERROR.MISSING_BASE_URL.message)
    }

    const redirectTo = `${baseUrl}${kakaoCallbackPath}`

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: redirectTo,
      },
    })

    if (error) {
      console.error('[Kakao Error]: ', error.message, error)
      toast.error(TOAST_MESSAGE.AUTH.KAKAO_FAILED)
    }
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
