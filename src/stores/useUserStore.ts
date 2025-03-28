import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  id: string | null
  nickname: string | null
  username: string | null
  avatarUrl: string | null

  setUser: (user: Partial<UserState>) => void
  getUser: () => Pick<UserState, 'id' | 'nickname' | 'username' | 'avatarUrl'>
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      id: null,
      username: null,
      nickname: null,
      avatarUrl: null,
      setUser: (user) => set((state) => ({ ...state, ...user })),
      getUser: () => {
        const { id, username, nickname, avatarUrl } = get()
        return { id, username, nickname, avatarUrl }
      },
      clearUser: () => set({ id: null, username: null, nickname: null, avatarUrl: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
)
