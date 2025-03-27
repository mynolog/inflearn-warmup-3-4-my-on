import { useQuery } from '@tanstack/react-query'
import { kyInstance } from '@/lib/kyInstance'
import { UserResponseDTO } from '@/types/dto/user'
import { API_ENDPOINTS } from '@/constants/routes'

const fetchUsers = async (): Promise<UserResponseDTO[]> => {
  return kyInstance.get(API_ENDPOINTS.USERS).json()
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  })
}
