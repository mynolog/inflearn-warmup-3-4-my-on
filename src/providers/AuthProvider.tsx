'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

export default function AuthProvider({
  accessToken,
  children,
}: {
  accessToken: string | null
  children: React.ReactNode
}) {
  const supabase = createBrowserSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription: authListner },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
    return () => {
      authListner.unsubscribe()
    }
  }, [accessToken, supabase, router])
  return children
}
