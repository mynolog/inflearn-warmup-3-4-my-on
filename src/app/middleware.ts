import type { CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { EXACT_SAFE_PATHS, ROUTES } from '@/constants/routes'

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

  // 세션 확인
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // NextRequest는 직접 수정 불가하여 복제 후 사용
  const redirectUrl = request.nextUrl.clone()

  const protectedRoutes = ['/', '/direct-message']

  // 비로그인 상태 -> 보호된 라우트로 접근 시 -> 로그인 페이지로 리다이렉트
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/'),
  )

  if (isProtectedRoute && !session) {
    redirectUrl.pathname = ROUTES.LOGIN
    return NextResponse.redirect(redirectUrl)
  }

  // 로그인 상태 -> /auth 세그먼트 접근 시 -> 메인 페이지로 리다이렉트
  if (session && request.nextUrl.pathname.startsWith('/auth')) {
    redirectUrl.pathname = ROUTES.HOME
    return NextResponse.redirect(redirectUrl)
  }

  // 인증 토큰 업데이트
  await supabase.auth.getUser()

  return response
}

export async function middleware(request: NextRequest) {
  return await applyMiddlewareSupabaseClient(request)
}

export const config = {
  matcher: EXACT_SAFE_PATHS,
}
