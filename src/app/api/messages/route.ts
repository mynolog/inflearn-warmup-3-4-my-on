import { ERROR_RESPONSE } from '@/constants/error'
import { TABLES } from '@/constants/supabase'
import { CreateMessageRequestDTO } from '@/types/dto/message'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { room_id, sender_id, content }: CreateMessageRequestDTO = await request.json()
  const supabase = await createServerSupabaseClient()

  try {
    const { data: insertedMessages, error: insertError } = await supabase
      .from(TABLES.MESSAGES)
      .insert({
        room_id,
        sender_id,
        content,
      })
      .select()

    if (insertError || !insertedMessages || insertedMessages.length === 0) {
      console.error(insertError)
      return NextResponse.json(
        { error: ERROR_RESPONSE.DB_ERROR.message },
        { status: ERROR_RESPONSE.DB_ERROR.status },
      )
    }

    const newMessage = insertedMessages[0]

    const { error: updateError } = await supabase
      .from(TABLES.ROOMS)
      .update({ last_message_id: newMessage.id })
      .eq('id', room_id)

    if (updateError) {
      console.error(updateError)
      return NextResponse.json(
        { error: '메시지는 저장되었으나 채팅방 정보 갱신에 실패했습니다.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ newMessage }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: ERROR_RESPONSE.SERVER_ERROR.message },
      { status: ERROR_RESPONSE.SERVER_ERROR.status },
    )
  }
}
