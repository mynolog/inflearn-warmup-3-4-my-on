import { NextResponse, NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'
import { ERROR_RESPONSE } from '@/constants/error'

export async function GET(_: NextRequest, { params }: { params: { roomId: string } }) {
  const { roomId } = params
  const supabase = await createServerSupabaseClient()

  try {
    const { data: messages, error } = await supabase
      .from(TABLES.MESSAGES)
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: ERROR_RESPONSE.DB_ERROR.message },
        { status: ERROR_RESPONSE.DB_ERROR.status },
      )
    }
    return NextResponse.json({ messages }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
