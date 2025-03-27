import type { CreateUserDTO } from '@/types/dto/user'
import type { KakaoUser } from '@/types/oauth/Kakao'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { kyInstance } from '@/lib/kyInstance'
import { API_ENDPOINTS, ROUTES } from '@/constants/routes'
import { TABLES } from '@/constants/supabase'

export default async function KakaoUserRegisterPage() {
  const supabase = await createServerSupabaseClient(cookies(), true)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user || error) {
    redirect('/auth/auth-code-error')
  }

  const { data: existingUser } = await supabase
    .from(TABLES.USERS)
    .select('id')
    .eq('id', user.id)
    .maybeSingle()

  if (!existingUser) {
    const {
      id,
      email,
      user_metadata: { full_name, avatar_url },
    } = user as KakaoUser

    const nickname = full_name ?? 'kakao'

    const payload: CreateUserDTO = {
      id,
      email,
      nickname,
      avatar_url,
      provider: 'kakao',
    }

    await kyInstance.post(API_ENDPOINTS.OAUTH_USER_REGISTER, {
      json: payload,
    })
  }

  redirect(ROUTES.HOME)
}
