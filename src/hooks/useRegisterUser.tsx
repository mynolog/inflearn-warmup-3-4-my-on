import type { CreateUserDTO } from '@/types/dto/user'
import { useMutation } from '@tanstack/react-query'
import { kyInstance } from '@/lib/kyInstance'
import { API_ENDPOINTS } from '@/constants/routes'

const registerUser = async (data: CreateUserDTO) => {
  return kyInstance.post(API_ENDPOINTS.EMAIL_USER_REGISTER, {
    json: data,
  })
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('회원가입 성공', data)
    },
    onError: (error) => {
      console.error('회원가입 실패', error)
    },
  })
}
