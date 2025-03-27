export interface CreateUserDTO {
  id: string
  email: string
  nickname: string
  avatar_url?: string
  provider: 'email' | 'kakao'
}

export interface UserResponseDTO {
  id: string
  nickname: string
  username: string
  email: string
  created_at: string
  avatar_url: string
}
