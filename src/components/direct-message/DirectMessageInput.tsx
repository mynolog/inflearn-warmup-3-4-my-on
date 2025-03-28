'use client'

import { useState } from 'react'
import TextAreaAutosize from 'react-textarea-autosize'

export default function DirectMessageInput() {
  const [message, setMessage] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (message.trim()) {
        console.log(message)
        setMessage('')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  return (
    <TextAreaAutosize
      minRows={1}
      maxRows={5}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholder="메시지 입력"
      className="w-full resize-none rounded-md border px-3 py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-mint-600"
    />
  )
}
