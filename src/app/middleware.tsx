import type { CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export const applyMiddlewareSupabaseClient = async (request: NextRequest) => {
  // 변경되지 않은 응답을 생성
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_URL 또는 SUPABASE_ANON_KEY가 없습니다.')
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        // 쿠키 업데이트 시 요청 및 응답 쿠키 업데이트
        request.cookies.set({
          name,
          value,
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        // 쿠키 삭제 시 요청 및 응답 쿠키 업데이트
        request.cookies.set({
          name,
          value: '',
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  })

  // 인증 토큰 업데이트
  await supabase.auth.getUser()

  return response
}

export async function middleware(request: NextRequest) {
  return await applyMiddlewareSupabaseClient(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
