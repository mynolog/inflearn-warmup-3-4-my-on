'use client'

import Image from 'next/image'
import { useUserStore } from '@/stores/useUserStore'
import Skeleton from '../common/skeleton/Skeleton'

export default function MyProfilePreview() {
  const { nickname, avatarUrl } = useUserStore()
  return (
    <>
      {nickname && avatarUrl ? (
        <div className="flex w-full items-center gap-5">
          <div className="mx-auto h-14 w-14 overflow-hidden rounded-full md:mx-0">
            <Image
              src={avatarUrl}
              width={56}
              height={56}
              alt={nickname}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span className="hidden text-xl font-bold md:inline">{nickname}</span>
        </div>
      ) : (
        <div className="flex w-full items-center gap-5">
          <div className="h-14 w-14 overflow-hidden rounded-full">
            <Skeleton aspectRatio="1" className="h-full w-full" borderRadius="rounded-full" />
          </div>
          <div className="hidden flex-1 md:block">
            <Skeleton height="20px" className="w-3/4" />
          </div>
        </div>
      )}
    </>
  )
}
