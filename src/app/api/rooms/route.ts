import type { CreateRoomRequestDTO } from '@/types/dto/room'
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'
import { ERROR_RESPONSE } from '@/constants/error'

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
      .select('id, userA_id, userB_id, last_message_id, last_message:myon_messages (content)')
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

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()

  try {
    const { id, userA_id, userB_id }: CreateRoomRequestDTO = await request.json()

    const { error } = await supabase.from(TABLES.ROOMS).insert({
      id,
      userA_id,
      userB_id,
    })

    if (error) {
      return NextResponse.json(
        { error: ERROR_RESPONSE.DB_ERROR.message },
        { status: ERROR_RESPONSE.DB_ERROR.status },
      )
    }

    return NextResponse.json({ message: 'Room created successfully' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Failed to create room' }, { status: 500 })
  }
}
