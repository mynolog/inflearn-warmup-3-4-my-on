'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { EXACT_SAFE_PATHS } from '@/constants/routes'

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

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const isSafePath = EXACT_SAFE_PATHS.includes(pathname)
      const tokenChanged = session?.access_token !== accessToken

      if (isSafePath && tokenChanged) {
        router.refresh()
      }
    })

    return () => subscription.unsubscribe()
  }, [accessToken, supabase, router, pathname])

  return children
}
