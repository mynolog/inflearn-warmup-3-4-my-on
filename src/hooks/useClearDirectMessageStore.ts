import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useDirectMessageStore } from '@/stores/useDirectMessageStore'

export function useClearDirectMessageStore() {
  const pathname = usePathname()
  const hasCleared = useRef(false)
  const clearDirectMessageState = useDirectMessageStore((state) => state.clearDirectMessageState)

  useEffect(() => {
    if (!hasCleared.current && (pathname === '/' || pathname === '/direct-message')) {
      clearDirectMessageState()
      hasCleared.current = true
    }
  }, [pathname, clearDirectMessageState])
}
