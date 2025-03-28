import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DirectMessageState {
  targetUserId: string | null
  currentRoomId: string | null
  setTargetUserId: (id: string) => void
  setCurrentRoomId: (id: string) => void
  clearDirectMessageState: () => void
}

export const useDirectMessageStore = create<DirectMessageState>()(
  persist(
    (set) => ({
      targetUserId: null,
      currentRoomId: null,
      setTargetUserId: (id) => set({ targetUserId: id }),
      setCurrentRoomId: (id) => set({ currentRoomId: id }),
      clearDirectMessageState: () => set({ targetUserId: null, currentRoomId: null }),
    }),
    {
      name: 'dm-storage',
    },
  ),
)
