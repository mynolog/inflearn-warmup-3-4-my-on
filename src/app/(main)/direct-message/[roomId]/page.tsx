import { Metadata } from 'next'
import DirectMessageRoomMain from '@/components/layout/main/DirectMessageRoomMain'

export const metadata: Metadata = {
  title: '1:1 메시지 · myOn',
  description: '상대방과 실시간 채팅을 나눠보세요.',
}

export default function DirectMeesageRoomPage({ params }: { params: { roomId: string } }) {
  return (
    <div>
      <DirectMessageRoomMain roomId={params.roomId} />
    </div>
  )
}
