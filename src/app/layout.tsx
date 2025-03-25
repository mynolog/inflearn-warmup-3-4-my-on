import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Providers from '@/providers/Providers'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  weight: ['200', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MyOn · 나를 켜는 순간',
  description: 'MyOn · 지금 나만의 순간을 기록해보세요.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/pavicon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${notoSansKR.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
