import { Metadata } from 'next'
import DirectMessageRoomMain from '@/components/layout/main/DirectMessageRoomMain'

export const metadata: Metadata = {
  title: '1:1 메시지 · myOn',
  description: '상대방과 채팅을 실시간을 나눠보세요.',
}

export default function DirectMeesageRoomPage() {
  return (
    <div>
      <DirectMessageRoomMain />
    </div>
  )
}
