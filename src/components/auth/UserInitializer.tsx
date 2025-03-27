'use client'

import { useEffect } from 'react'
import { kyInstance } from '@/lib/kyInstance'
import { useUserStore } from '@/stores/useUserStore'
import { API_ENDPOINTS } from '@/constants/routes'
import { UserResponseDTO } from '@/types/dto/user'
import { toast } from 'react-toastify'

export default function UserInitializer() {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          nickname,
          username,
          avatar_url: avatarUrl,
        } = await kyInstance.get(API_ENDPOINTS.USER_PROFILE).json<UserResponseDTO>()
        setUser({
          nickname,
          username,
          avatarUrl,
        })
      } catch (error) {
        console.error(error)
        toast.error('유저 정보를 불러오지 못했습니다. 다시 시도해 주세요.')
      }
    }
    fetchUser()
  }, [setUser])

  return null
}
