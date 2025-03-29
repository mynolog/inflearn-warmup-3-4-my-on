import { NextResponse, NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'

export async function GET(_: NextRequest, { params }: { params: { roomId: string } }) {
  const supabase = await createServerSupabaseClient()
  const { roomId } = params

  const { data: room, error } = await supabase
    .from(TABLES.ROOMS)
    .select('*')
    .eq('id', roomId)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }

  return NextResponse.json({ room }, { status: 200 })
}
