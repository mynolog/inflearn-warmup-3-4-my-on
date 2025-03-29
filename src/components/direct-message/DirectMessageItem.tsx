'use client'

import type { UserResponseDTO } from '@/types/dto/user'
import Link from 'next/link'
import Image from 'next/image'
import { useDirectMessageStore } from '@/stores/useDirectMessageStore'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

interface DirectMessageItemProps {
  user: UserResponseDTO
  roomId: string
  lastMessagePreview: string
}

export default function DirectMessageItem({
  user,
  roomId,
  lastMessagePreview,
}: DirectMessageItemProps) {
  const pathname = usePathname()
  const { setCurrentRoomId, setTargetUserId, setTargetUsername, setTargetNickname } =
    useDirectMessageStore()
  const isActive = pathname === `${ROUTES.DIRECT_MESSAGE}/${roomId}`

  return (
    <li key={user.id} className="flex w-full items-center gap-5">
      <Link
        href={`${ROUTES.DIRECT_MESSAGE}/${roomId}`}
        onClick={() => {
          setTargetUserId(user.id)
          setTargetUsername(user.username)
          setTargetNickname(user.nickname)
          setCurrentRoomId(roomId)
        }}
        className={`duration-350 flex w-full items-center justify-center gap-5 rounded-lg p-2 ${!roomId && 'pointer-events-none opacity-50'} ${isActive && 'bg-gray-100 text-mint-800'}`}
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
