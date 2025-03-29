'use client'

import { useEffect } from 'react'
import { kyInstance } from '@/lib/kyInstance'
import { useUserStore } from '@/stores/useUserStore'
import { API_ENDPOINTS } from '@/constants/routes'
import { UserResponseDTO } from '@/types/dto/user'
import { toast } from 'react-toastify'
import { TOAST_MESSAGE } from '@/constants/toastMessages'

export default function UserInitializer() {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          id,
          nickname,
          username,
          avatar_url: avatarUrl,
        } = await kyInstance.get(API_ENDPOINTS.USER_PROFILE).json<UserResponseDTO>()
        setUser({
          id,
          nickname,
          username,
          avatarUrl,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error('[User Init Error]: ', error.message, error)
          toast.error(TOAST_MESSAGE.SYSTEM.USER_INIT_FAILED)
        }
      }
    }
    fetchUser()
  }, [setUser])

  return null
}
