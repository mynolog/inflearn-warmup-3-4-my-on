'use client'

import type { CreateRoomRequestDTO, RoomResponseDTO } from '@/types/dto/room'
import type { MessageResponseDTO } from '@/types/dto/message'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { HTTPError } from 'ky'
import { kyInstance } from '@/lib/kyInstance'
import { useUserStore } from '@/stores/useUserStore'
import { useDirectMessageStore } from '@/stores/useDirectMessageStore'
import { API_ENDPOINTS, ROUTES } from '@/constants/routes'
import DirectMessageForm from '@/components/direct-message/DirectMessageForm'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'
import { TABLES } from '@/constants/supabase'
import { formatToKoreanTime } from '@/utils/format'
import Button from '@/components/common/button/Button'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/constants/toastMessages'

interface DirectMessageRoomMainProps {
  roomId: string
}

export default function DirectMessageRoomMain({ roomId }: DirectMessageRoomMainProps) {
  const router = useRouter()
  const { id: currentUserId, username: currentUsername } = useUserStore()
  const { targetUserId, targetUsername, targetNickname } = useDirectMessageStore()
  const [messages, setMessages] = useState<MessageResponseDTO[]>([])
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLUListElement | null>(null)
  const userIdRef = useRef<string | null>(null)
  userIdRef.current = currentUserId

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const isFirstLoad = useRef(true)

  const isAtBottom = () => {
    const container = scrollContainerRef.current
    if (!container) return true
    const threshold = 50
    const position = container.scrollTop + container.clientHeight
    const height = container.scrollHeight
    return height - position < threshold
  }

  useEffect(() => {
    if (isFirstLoad.current && messages.length > 0) {
      scrollToBottom()
      isFirstLoad.current = false
    }
  }, [messages])

  useEffect(() => {
    if (!currentUserId || !targetUserId || !targetUsername) return

    const fetchRoomAndMessage = async () => {
      try {
        const searchParams = new URLSearchParams({
          targetUsername,
        })
        const res = await kyInstance.get(`${API_ENDPOINTS.ROOMS}/${roomId}?${searchParams}`)
        const { room }: { room: RoomResponseDTO | null } = await res.json()

        if (!room) {
          const payload: CreateRoomRequestDTO = {
            id: roomId,
            userA_id: currentUserId,
            userB_id: targetUserId,
          }
          await kyInstance.post(API_ENDPOINTS.ROOMS, { json: payload })
        } else {
          const res = await kyInstance.get(`${API_ENDPOINTS.MESSAGES}/${roomId}`)
          const { messages }: { messages: MessageResponseDTO[] } = await res.json()
          setMessages(messages)
        }
      } catch (error: unknown) {
        if (error instanceof HTTPError) {
          if (error.response.status === 403) {
            toast.error(TOAST_MESSAGE.DIRECT_MESSAGE.ROOM_FORBIDDEN)
            router.push(ROUTES.DIRECT_MESSAGE)
          }
          if (error.response.status === 404) {
            toast.error(TOAST_MESSAGE.DIRECT_MESSAGE.ROOM_NOT_EXIST)
          } else {
            toast.error(TOAST_MESSAGE.DIRECT_MESSAGE.ROOM_FETCH_ERROR)
          }
        } else {
          console.error('Unexpected error:', error)
          toast.error(TOAST_MESSAGE.SYSTEM.UNKNWON_ERROR)
        }
      }
    }
    fetchRoomAndMessage()
  }, [roomId, currentUserId, targetUserId, router])

  useEffect(() => {
    if (!currentUsername || !targetUsername || !targetNickname) return

    const supabase = createBrowserSupabaseClient()

    const channel = supabase
      .channel(`room-messages-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.MESSAGES,
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const updatedMessage = payload.new as MessageResponseDTO

          setMessages((prev) => {
            if (!prev) return [updatedMessage]
            const exists = prev.find((msg) => msg.id === updatedMessage.id)
            if (exists) {
              return prev
                .map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            }
            return [...prev, updatedMessage].sort(
              (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            )
          })

          const isOwn = updatedMessage.sender_id === userIdRef.current
          if (payload.eventType === 'INSERT') {
            if (isOwn) {
              scrollToBottom()
            } else {
              if (!isAtBottom()) {
                toast.info(`${targetNickname}: ${updatedMessage.content}`, {
                  position: 'top-right',
                  theme: 'dark',
                  onClick: () => scrollToBottom(),
                })
              } else {
                scrollToBottom()
              }
            }
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId, currentUsername, targetUsername])

  const handleDeleteMessage = async (messageId: string) => {
    await kyInstance.patch(`${API_ENDPOINTS.MESSAGE}/${messageId}`)
    toast.warn('메시지가 삭제되었습니다.', {
      autoClose: 2000,
      position: 'top-right',
      theme: 'dark',
    })
  }

  return (
    <main className="relative flex h-screen w-full flex-col">
      <div className="flex h-10 w-full items-center justify-center border-b bg-gray-50 px-4 py-3">
        <span className="text-xl font-semibold text-mint-800">{targetNickname}</span>
      </div>
      <ul
        ref={scrollContainerRef}
        className="chat-scrollable flex-1 space-y-5 overflow-y-auto px-3 py-4"
      >
        {messages?.map((message) =>
          message.sender_id === currentUserId ? (
            <li key={message.id} className="group flex items-center justify-end gap-2">
              <Button
                onClick={() => handleDeleteMessage(message.id)}
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
        <div className="pb-14" ref={bottomRef} />
      </ul>

      <div className="border-t px-4 py-3">
        <DirectMessageForm roomId={roomId} />
      </div>
    </main>
  )
}
