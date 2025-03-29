import { NextResponse, NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'

export async function GET(request: NextRequest, { params }: { params: { roomId: string } }) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { roomId } = params
  const targetUsername = request.nextUrl.searchParams.get('targetUsername')

  if (typeof targetUsername !== 'string' || targetUsername.trim() === '') {
    return NextResponse.json({ error: 'targetUsername이 누락되었습니다.' }, { status: 400 })
  }
  if (!user) {
    return NextResponse.json({ error: '로그인된 사용자가 없습니다.' }, { status: 401 })
  }

  const { data: currentUser, error: userError } = await supabase
    .from(TABLES.USERS)
    .select('username')
    .eq('id', user.id)
    .single()

  if (userError || !currentUser) {
    return NextResponse.json({ error: '현재 사용자 정보를 불러올 수 없습니다.' }, { status: 500 })
  }

  const { data: room, error } = await supabase
    .from(TABLES.ROOMS)
    .select('*')
    .eq('id', roomId)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // if (!room) {
  //   return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  // }

  return NextResponse.json({ room }, { status: 200 })
}
