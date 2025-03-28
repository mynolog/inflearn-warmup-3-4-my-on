import { NextResponse, NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'

export async function GET(request: NextRequest, { params }: { params: { roomId: string } }) {
  const supabase = await createServerSupabaseClient()
  const { roomId } = params

  const { data: room, error } = await supabase
    .from(TABLES.ROOMS)
    .select('*')
    .eq('id', roomId)
    .maybeSingle()

  if (error) {
    NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ room }, { status: 200 })
}
