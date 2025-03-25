import ReactQueryClientProvider from './ReactQueryClientProvider'
import AuthProvider from './AuthProvider'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import ToastProvider from './ToastProvider'

export default async function Providers({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <ReactQueryClientProvider>
      <AuthProvider accessToken={session?.access_token ?? null}>
        <ToastProvider />
        {children}
      </AuthProvider>
    </ReactQueryClientProvider>
  )
}
