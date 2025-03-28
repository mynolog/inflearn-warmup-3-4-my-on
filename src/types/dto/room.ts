export interface RoomResponse {
  room: RoomResponseDTO
}

export interface LastMessage {
  content: string
}

export interface RoomResponseDTO {
  id: string
  userA_id: string
  userB_id: string
  created_at: string
  updated_at: string
  last_message_id: string | null
  last_message: LastMessage | null
}

export interface CreateRoomRequestDTO {
  id: string
  userA_id: string
  userB_id: string
}
