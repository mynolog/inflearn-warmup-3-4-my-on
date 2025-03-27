import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  nickname: string | null
  username: string | null
  avatarUrl: string | null

  setUser: (user: Partial<UserState>) => void
  getUser: () => Pick<UserState, 'nickname' | 'username' | 'avatarUrl'>
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: null,
      nickname: null,
      avatarUrl: null,
      setUser: (user) => set((state) => ({ ...state, ...user })),
      getUser: () => {
        const { username, nickname, avatarUrl } = get()
        return { username, nickname, avatarUrl }
      },
      clearUser: () => set({ username: null, nickname: null, avatarUrl: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
)
