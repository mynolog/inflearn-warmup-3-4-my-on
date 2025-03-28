import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { applyMiddlewareSupabaseClient } from './app/middleware'

export async function middleware(request: NextRequest) {
  try {
    return await applyMiddlewareSupabaseClient(request)
  } catch (error) {
    console.error('🔥 Middleware Error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/', '/direct-message/:path*, /auth/:path*'],
}
