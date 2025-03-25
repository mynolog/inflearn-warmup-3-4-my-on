import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from 'types_db'
import type { CreateUserDTO } from '@/types/dto/user'
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'
import { ERROR_RESPONSE } from '@/constants/error'
import { generateRandomSuffix } from '@/utils/random'

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { id, email, nickname }: CreateUserDTO = await request.json()
  let username = nickname.toLowerCase()

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

  const { data: existingUsername } = await supabase
    .from(TABLES.USERS)
    .select('id')
    .eq('username', nickname)
    .maybeSingle()

  if (existingUsername) {
    const suffix = generateRandomSuffix(6)
    username += `_${suffix}`
  }

  // email 중복 없으면 users 테이블에 데이터 추가
  const { error } = await supabase.from(TABLES.USERS).insert({
    id,
    email,
    nickname,
    username,
  })

  if (error) {
    return NextResponse.json(
      { message: ERROR_RESPONSE.DB_ERROR.message },
      { status: ERROR_RESPONSE.DB_ERROR.status },
    )
  }
  //TODO: 성공, 실패 분기 처리 고도화
  return NextResponse.json({ message: '유저 생성 완료' }, { status: 201 })
}
