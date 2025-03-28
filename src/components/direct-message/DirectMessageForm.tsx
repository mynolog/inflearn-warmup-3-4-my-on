'use client'

import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { kyInstance } from '@/lib/kyInstance'
import { API_ENDPOINTS } from '@/constants/routes'
import { useUserStore } from '@/stores/useUserStore'
import { CreateMessageRequestDTO } from '@/types/dto/message'

interface DirectMessageFormProps {
  roomId: string
}

export default function DirectMessageForm({ roomId }: DirectMessageFormProps) {
  const [message, setMessage] = useState('')
  const { id: currentUserId } = useUserStore()
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return
    if (!currentUserId) {
      return
    }

    try {
      setIsSending(true)
      const payload: CreateMessageRequestDTO = {
        content: message,
        room_id: roomId,
        sender_id: currentUserId,
      }
      await kyInstance.post(API_ENDPOINTS.MESSAGES, {
        json: payload,
      })
      console.log('메시지 전송 완료')
      setMessage('')
    } catch (error) {
      console.error(error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (!message.trim()) return
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setMessage(value)
  }

  return (
    <TextareaAutosize
      minRows={1}
      maxRows={5}
      value={message}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholder="메시지 입력"
      className="w-full resize-none rounded-md border px-3 py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-mint-600"
    />
  )
}
