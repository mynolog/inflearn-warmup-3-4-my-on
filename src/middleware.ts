import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { applyMiddlewareSupabaseClient } from './app/middleware'
import { EXACT_SAFE_PATHS } from './constants/routes'

export async function middleware(request: NextRequest) {
  try {
    return await applyMiddlewareSupabaseClient(request)
  } catch (error) {
    console.error('Middleware Error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: EXACT_SAFE_PATHS,
}
