import { NextResponse, NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { TABLES } from '@/constants/supabase'
import { ERROR_RESPONSE } from '@/constants/error'

export async function PATCH(_: NextRequest, { params }: { params: { messageId: string } }) {
  const { messageId } = params
  const supabase = await createServerSupabaseClient()

  try {
    const { data, error } = await supabase
      .from(TABLES.MESSAGES)
      .update({
        is_deleted: true,
      })
      .eq('id', messageId)

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: ERROR_RESPONSE.DB_ERROR.message },
        { status: ERROR_RESPONSE.DB_ERROR.status },
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: ERROR_RESPONSE.SERVER_ERROR.message },
      { status: ERROR_RESPONSE.SERVER_ERROR.status },
    )
  }
}
