import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DirectMessageState {
  targetUserId: string | null
  targetUsername: string | null
  targetNickname: string | null
  currentRoomId: string | null
  setTargetUserId: (id: string) => void
  setTargetUsername: (username: string) => void
  setTargetNickname: (nickname: string) => void
  setCurrentRoomId: (id: string) => void
  clearDirectMessageState: () => void
}

export const useDirectMessageStore = create<DirectMessageState>()(
  persist(
    (set) => ({
      targetUserId: null,
      targetUsername: null,
      targetNickname: null,
      currentRoomId: null,
      setTargetUserId: (id) => set({ targetUserId: id }),
      setTargetUsername: (username) => set({ targetUsername: username }),
      setTargetNickname: (nickname) => set({ targetNickname: nickname }),
      setCurrentRoomId: (id) => set({ currentRoomId: id }),
      clearDirectMessageState: () =>
        set({ targetUserId: null, targetUsername: null, currentRoomId: null }),
    }),
    {
      name: 'dm-storage',
    },
  ),
)
