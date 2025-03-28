import { Metadata } from 'next'
import DirectMessageMain from '@/components/layout/main/DirectMessageMain'

export const metadata: Metadata = {
  title: '다이렉트 메시지 · myOn',
  description: '1:1 채팅을 나눠보세요.',
}

export default function DirectMessagePage() {
  return (
    <div className="flex h-screen w-full items-center justify-center font-bold">
      <DirectMessageMain />
    </div>
  )
}
