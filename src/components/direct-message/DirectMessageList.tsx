'use client'

import type { LastMessage, RoomResponse } from '@/types/dto/room'
import { useEffect, useState } from 'react'
import { useUsers } from '@/hooks/useUsers'
import Skeleton from '../common/skeleton/Skeleton'
import { generateRoomId } from '@/utils/random'
import { useUserStore } from '@/stores/useUserStore'
import { kyInstance } from '@/lib/kyInstance'
import DirectMessageItem from './DirectMessageItem'
import { API_ENDPOINTS } from '@/constants/routes'

export default function DirectMessageList() {
  const { id: currentUserId, username: currentUsername } = useUserStore()
  const { data: users, isLoading, isError } = useUsers()
  const [roomLinks, setRoomLinks] = useState<
    { userId: string; roomId: string; isExisting: boolean; lastMessage: string | null }[]
  >([])

  useEffect(() => {
    if (!currentUserId || !currentUsername || !users) return

    const fetchRooms = async () => {
      const results = await Promise.all(
        users.map(async (user) => {
          const searchParams = new URLSearchParams({
            currentUserId,
            targetUserId: user.id,
          })

          const res = await kyInstance.get(`${API_ENDPOINTS.ROOMS}?${searchParams}`)
          const { room }: RoomResponse = await res.json()
          let roomId: string
          let isExisting = false
          let lastMessage: string | null = null

          if (room) {
            roomId = room.id
            isExisting = true
            lastMessage = room.last_message?.content ?? null
          } else {
            const payload = {
              usernameA: currentUsername,
              usernameB: user.username,
            }
            roomId = generateRoomId(payload)
            isExisting = false
          }

          return {
            userId: user.id,
            roomId,
            isExisting,
            lastMessage,
          }
        }),
      )

      setRoomLinks(results)
    }
    fetchRooms()
  }, [currentUserId, currentUsername, users])

  useEffect(() => {
    console.log(roomLinks)
  }, [roomLinks])

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
            users.map((user) => {
              const matchedRoom = roomLinks.find((room) => room.userId === user.id)
              const roomId = matchedRoom?.roomId
              const lastMessagePreview = matchedRoom?.lastMessage ?? ''

              return (
                <DirectMessageItem
                  key={user.id}
                  user={user}
                  roomId={roomId}
                  lastMessagePreview={lastMessagePreview}
                />
              )
            })
          ) : (
            <li className="text-sm text-gray-500">표시할 유저가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  )
}
