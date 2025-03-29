'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { ROUTES } from '@/constants/routes'

export default function AuthProvider({
  accessToken,
  children,
}: {
  accessToken: string | null
  children: React.ReactNode
}) {
  const supabase = createBrowserSupabaseClient()
  const router = useRouter()
  const pathname = usePathname()

  // ✅ 보호 경로 체크 유틸 ("/direct-message" 포함된 경로 모두)
  const isProtectedPath = (path: string) => path === '/' || path.startsWith('/direct-message')

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const tokenChanged = session?.access_token !== accessToken

      if (!session && isProtectedPath(pathname)) {
        // 로그아웃 시 보호 경로에 있으면 직접 이동 -> replace
        router.replace(ROUTES.LOGIN)
        return
      }

      // 세션은 유지되지만 갱신된 경우 -> refresh
      if (tokenChanged) {
        router.refresh()
      }
    })

    return () => subscription.unsubscribe()
  }, [accessToken, supabase, router, pathname])

  return children
}
