import { NextResponse, NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'
import { ERROR_RESPONSE } from '@/constants/error'

export async function GET(_: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: ERROR_RESPONSE.UNAUTHORIZED.message },
      { status: ERROR_RESPONSE.UNAUTHORIZED.status },
    )
  }

  const { data: users, error } = await supabase.from(TABLES.USERS).select('*').neq('id', user.id)

  if (error) {
    return NextResponse.json(
      { error: ERROR_RESPONSE.DB_ERROR.message },
      { status: ERROR_RESPONSE.DB_ERROR.status },
    )
  }

  return NextResponse.json(users, { status: 200 })
}
