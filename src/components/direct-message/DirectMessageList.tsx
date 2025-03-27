'use client'

import Image from 'next/image'
import { useUsers } from '@/hooks/useUsers'
import Skeleton from '../common/skeleton/Skeleton'

export default function DirectMessageList() {
  const { data: users, isLoading, isError } = useUsers()

  return (
    <div className="flex w-full flex-col gap-3">
      {isError ? (
        <div>유저 목록을 불러오지 못했습니다.</div>
      ) : (
        <ul className="flex w-full flex-col gap-3">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <li key={i} className="flex w-full items-center gap-5">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Skeleton aspectRatio="1" className="h-full w-full" borderRadius="rounded-full" />
                </div>
                <div className="hidden flex-1 md:block">
                  <div className="flex flex-col gap-4">
                    <Skeleton height="10px" className="w-3/4" />
                    <Skeleton height="10px" className="w-3/4" />
                  </div>
                </div>
              </li>
            ))
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="flex w-full items-center gap-5">
                <div className="mx-auto h-12 w-12 overflow-hidden rounded-full md:mx-0">
                  <Image
                    src={user.avatar_url}
                    width={48}
                    height={48}
                    alt={user.nickname}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <span className="hidden text-sm font-semibold md:inline">{user.nickname}</span>
                  <span className="hidden text-xs text-gray-600 md:inline">마지막 메시지</span>
                </div>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">표시할 유저가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  )
}
