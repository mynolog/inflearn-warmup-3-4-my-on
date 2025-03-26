import { useCallback, useState } from 'react'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

interface DuplicationStatus {
  checked: boolean
  available: boolean | null
  loading: boolean
}

export const useDuplicationCheck = (table: string, column: string) => {
  const [status, setStatus] = useState<DuplicationStatus>({
    checked: false,
    available: null,
    loading: false,
  })

  const supabase = createBrowserSupabaseClient()

  const check = async (value: string) => {
    setStatus((prev) => ({ ...prev, loading: true }))

    const { data } = await supabase.from(table).select('id').eq(column, value).maybeSingle()

    setStatus({
      checked: true,
      available: !data,
      loading: false,
    })

    return !data
  }

  const reset = useCallback(() => {
    setStatus({
      checked: false,
      available: null,
      loading: false,
    })
  }, [])

  return { status, check, reset }
}
