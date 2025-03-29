import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'
import { ERROR_RESPONSE } from '@/constants/error'

export async function GET(_: NextRequest) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json(
      { error: ERROR_RESPONSE.UNAUTHORIZED.message },
      { status: ERROR_RESPONSE.UNAUTHORIZED.status },
    )
  }

  const { data: userData, error: userError } = await supabase
    .from(TABLES.USERS)
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (!userData || userError) {
    return NextResponse.json(
      { error: ERROR_RESPONSE.USER_NOT_FOUND.message },
      { status: ERROR_RESPONSE.USER_NOT_FOUND.status },
    )
  }

  return NextResponse.json(userData, { status: 200 })
}
