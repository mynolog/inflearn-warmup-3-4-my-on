'use client'

import UserInitializer from '@/components/auth/UserInitializer'
import Button from '@/components/common/button/Button'
import Skeleton from '@/components/common/skeleton/Skeleton'
import { TOAST_MESSAGE } from '@/constants/toastMessages'
import { useUserStore } from '@/stores/useUserStore'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'
import { useClearDirectMessageStore } from '@/hooks/useClearDirectMessageStore'

export default function HomeMain() {
  const { nickname, clearUser } = useUserStore()

  //TODO: 로그아웃 버튼은 별도 컴포넌트로 분리하여 재사용
  const supabase = createBrowserSupabaseClient()

  const handleSignout = async () => {
    clearUser()
    await toast.promise(
      supabase.auth.signOut(),
      {
        pending: TOAST_MESSAGE.AUTH.SIGNOUT_PENDING,
        success: TOAST_MESSAGE.AUTH.SIGNOUT_SUCCESS,
        error: TOAST_MESSAGE.AUTH.SIGNOUT_FAILED,
      },
      {
        autoClose: 2000,
        theme: 'light',
      },
    )
  }

  useClearDirectMessageStore()

  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <UserInitializer />
      {nickname ? <h1>{nickname}님, 환영합니다!</h1> : <Skeleton width="300px" height="40px" />}
      <Button
        onClick={handleSignout}
        className="flex items-center gap-2 !bg-red-400 px-3 text-white shadow-none hover:text-white"
      >
        <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
        <span className="hidden text-sm md:inline">로그아웃</span>
      </Button>
    </main>
  )
}
