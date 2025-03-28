'use client'

import type { UserResponseDTO } from '@/types/dto/user'
import Link from 'next/link'
import Image from 'next/image'
import { useDirectMessageStore } from '@/stores/useDirectMessageStore'

interface DirectMessageItemProps {
  user: UserResponseDTO
  roomId?: string
  lastMessagePreview: string
}

export default function DirectMessageItem({
  user,
  roomId,
  lastMessagePreview,
}: DirectMessageItemProps) {
  const { setCurrentRoomId, setTargetUserId } = useDirectMessageStore()

  if (!roomId) {
    return
  }

  return (
    <li key={user.id} className="flex w-full items-center gap-5">
      <Link
        href={`/direct-message/${roomId}`}
        onClick={() => {
          setTargetUserId(user.id)
          setCurrentRoomId(roomId)
        }}
        className={`flex w-full items-center justify-center gap-5 ${!roomId && 'pointer-events-none opacity-50'}`}
      >
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={user.avatar_url}
            width={48}
            height={48}
            priority
            alt={user.nickname}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hidden flex-col gap-1 md:flex md:flex-1">
          <span className="text-sm font-semibold">{user.nickname}</span>
          <span className="text-xs text-gray-600">{lastMessagePreview}</span>
        </div>
      </Link>
    </li>
  )
}
