'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRef } from 'react'

export default function ReactQueryClientProvider({ children }: React.PropsWithChildren) {
  const queryClientRef = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 30,
          refetchOnWindowFocus: false,
        },
      },
    }),
  )

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
}
