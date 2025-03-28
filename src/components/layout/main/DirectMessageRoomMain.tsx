'use client'

import type { CreateRoomRequestDTO, RoomResponseDTO } from '@/types/dto/room'
import type { MessageResponseDTO } from '@/types/dto/message'
import { useEffect, useState, useRef } from 'react'
import { kyInstance } from '@/lib/kyInstance'
import { useUserStore } from '@/stores/useUserStore'
import { useDirectMessageStore } from '@/stores/useDirectMessageStore'
import { API_ENDPOINTS } from '@/constants/routes'
import DirectMessageForm from '@/components/direct-message/DirectMessageForm'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { TABLES } from '@/constants/supabase'
import { formatToKoreanTime } from '@/utils/format'
import Button from '@/components/common/button/Button'

interface DirectMessageRoomMainProps {
  roomId: string
}

export default function DirectMessageRoomMain({ roomId }: DirectMessageRoomMainProps) {
  const { id: currentUserId } = useUserStore()
  const { targetUserId } = useDirectMessageStore()
  const [messages, setMessages] = useState<MessageResponseDTO[]>()
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

  useEffect(() => {
    if (!roomId) return
    const supabase = createBrowserSupabaseClient()

    const channel = supabase
      .channel(`room-messages-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.MESSAGES,
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const newMessage = payload.new as MessageResponseDTO
          setMessages((prev) => [...(prev || []), newMessage])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId])

  return (
    <main className="flex h-screen w-full flex-col">
      <ul className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {messages?.map((message) =>
          message.sender_id === currentUserId ? (
            <li key={message.id} className="group flex items-center justify-end gap-2">
              <Button
                className={`hidden !h-5 !w-5 group-hover:inline-block ${message.is_deleted && 'group-hover:hidden'}`}
              >
                <i className="fa-solid fa-trash text-sm text-red-400"></i>
              </Button>

              <div className="relative w-auto min-w-16 max-w-xs rounded-md bg-lime-100 p-3 text-sm">
                {message.is_deleted ? (
                  <span className="italic text-gray-400">삭제된 메시지입니다.</span>
                ) : (
                  message.content
                )}

                <span className="absolute bottom-[-20px] left-1 text-[0.6rem] text-gray-500">
                  {formatToKoreanTime(message.created_at)}
                </span>
              </div>
            </li>
          ) : (
            <li key={message.id} className="flex justify-start">
              <div className="relative w-auto min-w-16 max-w-xs rounded-md bg-gray-100 p-3 text-sm">
                {message.is_deleted ? (
                  <span className="italic text-gray-400">삭제된 메시지입니다.</span>
                ) : (
                  message.content
                )}
                <span className="absolute bottom-[-20px] right-1 text-[0.6rem] text-gray-500">
                  {formatToKoreanTime(message.created_at)}
                </span>
              </div>
            </li>
          ),
        )}
        <div ref={bottomRef} />
      </ul>

      <div className="border-t px-4 py-3">
        <DirectMessageForm roomId={roomId} />
      </div>
    </main>
  )
}
