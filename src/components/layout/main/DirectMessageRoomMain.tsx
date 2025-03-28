'use client'

import type { CreateRoomRequestDTO, RoomResponseDTO } from '@/types/dto/room'
import type { MessageResponseDTO } from '@/types/dto/message'
import { useEffect, useState } from 'react'
import { kyInstance } from '@/lib/kyInstance'
import { useUserStore } from '@/stores/useUserStore'
import { useDirectMessageStore } from '@/stores/useDirectMessageStore'
import { API_ENDPOINTS } from '@/constants/routes'
import DirectMessageInput from '@/components/direct-message/DirectMessageInput'

interface DirectMessageRoomMainProps {
  roomId: string
}

export default function DirectMessageRoomMain({ roomId }: DirectMessageRoomMainProps) {
  const { id: currentUserId } = useUserStore()
  const { targetUserId } = useDirectMessageStore()
  const [messages, setMessages] = useState<MessageResponseDTO[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentUserId || !targetUserId) {
      return
    }

    const fetchRoomAndMessage = async () => {
      try {
        const res = await kyInstance.get(`${API_ENDPOINTS.ROOMS}/${roomId}`)
        const { room }: { room: RoomResponseDTO | null } = await res.json()

        if (!room) {
          const payload: CreateRoomRequestDTO = {
            id: roomId,
            userA_id: currentUserId,
            userB_id: targetUserId,
          }
          await kyInstance.post(API_ENDPOINTS.ROOMS, {
            json: payload,
          })
          setMessages([])
        } else {
          const res = await kyInstance.get(`${API_ENDPOINTS.MESSAGES}/${roomId}`)
          const { messages }: { messages: MessageResponseDTO[] } = await res.json()
          setMessages(messages)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchRoomAndMessage()
  }, [roomId, currentUserId, targetUserId])

  return (
    <main className="flex h-screen w-full flex-col">
      <ul className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {messages?.map((message) =>
          message.sender_id === currentUserId ? (
            <li key={message.id} className="flex justify-end">
              <div className="w-auto max-w-xs rounded-md bg-lime-100 p-3 text-sm">
                {message.content}
              </div>
            </li>
          ) : (
            <li key={message.id} className="flex justify-start">
              <div className="w-auto max-w-xs rounded-md bg-gray-100 p-3 text-sm">
                {message.content}
              </div>
            </li>
          ),
        )}
      </ul>

      <div className="border-t px-4 py-3">
        <DirectMessageInput />
      </div>
    </main>
  )
}
