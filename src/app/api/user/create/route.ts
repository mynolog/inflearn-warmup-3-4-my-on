import type { CreateUserDTO } from '@/types/dto/user'
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'
import { ERROR_RESPONSE } from '@/constants/error'

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { id, email, nickname }: CreateUserDTO = await request.json()

  // 이메일 중복 서버  검증
  const { data: existingEmail } = await supabase
    .from(TABLES.USERS)
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (existingEmail) {
    return NextResponse.json(
      {
        error: ERROR_RESPONSE.EMAIL_TAKEN.message,
      },
      { status: ERROR_RESPONSE.EMAIL_TAKEN.status },
    )
  }

  // 닉네임 중복 서버 검증
  const { data: existingNickname } = await supabase
    .from(TABLES.USERS)
    .select('id')
    .eq('nickname', nickname)
    .maybeSingle()

  if (existingNickname) {
    return NextResponse.json(
      {
        error: ERROR_RESPONSE.NICKNAME_TAKEN.message,
      },
      { status: ERROR_RESPONSE.NICKNAME_TAKEN.status },
    )
  }

  // nickname, email 중복 없으면 users 테이블에 데이터 추가
  const { error } = await supabase.from(TABLES.USERS).insert({
    id,
    email,
    nickname,
  })

  if (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }

  return NextResponse.json({ message: 'ok' }, { status: 201 })
}
