import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('인증 실패:', error.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }

    return NextResponse.redirect(`${origin}/auth/oauth/kakao/register`)
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
