'use client'

import type { UserResponseDTO } from '@/types/dto/user'
import Link from 'next/link'
import Image from 'next/image'

interface DirectMessageItemProps {
  user: UserResponseDTO
  roomId?: string
}

export default function DirectMessageItem({ user, roomId }: DirectMessageItemProps) {
  return (
    <li key={user.id} className="flex w-full items-center gap-5">
      <Link
        href={roomId ? `/direct-message/${roomId}` : '#'}
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
          <span className="text-xs text-gray-600">마지막 메시지</span>
        </div>
      </Link>
    </li>
  )
}
