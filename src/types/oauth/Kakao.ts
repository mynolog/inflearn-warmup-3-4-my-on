import type { User } from '@supabase/supabase-js'

interface KakaoUserMetadata {
  avatar_url: string
  full_name: string
}

export interface KakaoUser extends User {
  email: string
  user_metadata: KakaoUserMetadata
}
