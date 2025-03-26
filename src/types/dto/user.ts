export interface CreateUserDTO {
  id: string
  email: string
  nickname: string
  avatar_url?: string
  provider: 'email' | 'kakao'
}
