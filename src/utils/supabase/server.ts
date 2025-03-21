'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from 'types_db'

export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin: boolean = false,
) => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_SERVICE_ROLE = process.env.NEXT_SUPABASE_SERVICE_ROLE
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (
    !SUPABASE_URL ||
    !SUPABASE_ANON_KEY ||
    !SUPABASE_SERVICE_ROLE ||
    (SUPABASE_SERVICE_ROLE && admin && !SUPABASE_SERVICE_ROLE)
  ) {
    throw new Error('필수 환경 변수들이 설정되지 않았습니다.')
  }

  return createServerClient<Database>(
    SUPABASE_URL,
    admin ? SUPABASE_SERVICE_ROLE : SUPABASE_ANON_KEY,
    {
      cookies: {
        async get(name: string) {
          try {
            const resolvedCookies = await cookieStore
            return resolvedCookies.get(name)?.value
          } catch (error) {
            console.error(`쿠키 ${name}을(를) 가져오는 중 오류가 발생했습니다:`, error)
            throw new Error(`쿠키를 가져올 수 없습니다: ${name}`)
          }
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            const resolvedCookies = await cookieStore
            resolvedCookies.set({ name, value, ...options })
          } catch (error) {
            console.error(
              `쿠키 ${name}을(를) 값 ${value}로 설정하는 중 오류가 발생했습니다:`,
              error,
            )
            throw new Error(`쿠키를 설정할 수 없습니다: ${name}`)
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            const resolvedCookies = await cookieStore
            resolvedCookies.set({ name, value: '', ...options })
          } catch (error) {
            console.error(`쿠키 ${name}을(를) 제거하는 중 오류가 발생했습니다:`, error)
            throw new Error(`쿠키를 제거할 수 없습니다: ${name}`)
          }
        },
      },
    },
  )
}
