import type { CreateUserDTO } from '@/types/dto/user'
import type { KakaoUser } from '@/types/oauth/Kakao'
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { kyInstance } from '@/lib/kyInstance'
import { API_ENDPOINTS } from '@/constants/routes'
import { TABLES } from '@/constants/supabase'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: existingUser } = await supabase
        .from(TABLES.USERS)
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

      if (existingUser) {
        return NextResponse.redirect(`${origin}${next}`)
      }

      const {
        id,
        email,
        user_metadata: { full_name, avatar_url },
      } = user as KakaoUser
      const nickname = full_name ?? 'Kakao'

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

    return NextResponse.redirect(`${origin}${next}`)
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
