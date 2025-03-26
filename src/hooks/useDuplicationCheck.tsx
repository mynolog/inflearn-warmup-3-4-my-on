import { useCallback, useState } from 'react'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/constants/toastMessages'

interface DuplicationStatus {
  checked: boolean
  available: boolean | null
  loading: boolean
  provider: 'kakao' | 'email'
}

export const useDuplicationCheck = (table: string, column: string) => {
  const [status, setStatus] = useState<DuplicationStatus>({
    checked: false,
    available: null,
    loading: false,
    provider: 'email',
  })

  const supabase = createBrowserSupabaseClient()

  const check = async (value: string) => {
    setStatus((prev) => ({ ...prev, loading: true }))

    const { data, error } = await supabase
      .from(table)
      .select('id, provider')
      .eq(column, value)
      .maybeSingle()

    if (error) {
      setStatus({
        checked: true,
        available: true,
        loading: false,
        provider: 'email',
      })
      toast.error(TOAST_MESSAGE.VALID.EMAIL_TAKEN)
      return true
    }

    const provider = data?.provider === 'kakao' ? 'kakao' : 'email'

    setStatus({
      checked: true,
      available: !data,
      loading: false,
      provider: provider,
    })

    if (!data) {
      // 사용 가능한 이메일
      toast.success(TOAST_MESSAGE.VALID.EMAIL_AVAILABLE)
    } else {
      // 중복된 이메일 처리
      if (provider === 'kakao') {
        toast.warn(TOAST_MESSAGE.VALID.KAKAO_EMAIL_TAKEN) // 카카오 이메일 중복
      } else {
        toast.error(TOAST_MESSAGE.VALID.EMAIL_TAKEN) // 일반 이메일 중복
      }
    }

    return !data // 데이터가 없으면 true (사용 가능), 있으면 false (중복)
  }

  const reset = useCallback(() => {
    setStatus({
      checked: false,
      available: null,
      loading: false,
      provider: 'email',
    })
  }, [])

  return { status, check, reset }
}
