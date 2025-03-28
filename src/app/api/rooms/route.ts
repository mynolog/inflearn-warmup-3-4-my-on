import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const currentUserId = request.nextUrl.searchParams.get('currentUserId')
  const targetUserId = request.nextUrl.searchParams.get('targetUserId')

  if (!currentUserId || !targetUserId) {
    return NextResponse.json({ error: 'Missing query parameters' }, { status: 400 })
  }

  try {
    const { data: room, error } = await supabase
      .from(TABLES.ROOMS)
      .select('id, userA_id, userB_id')
      .or(
        `and(userA_id.eq.${currentUserId},userB_id.eq.${targetUserId}),and(userA_id.eq.${targetUserId},userB_id.eq.${currentUserId})`,
      )
      .maybeSingle()

    if (error) {
      throw error
    }

    return NextResponse.json({ room }, { status: 200 })
  } catch (error) {
    console.error(error)
  }
}
