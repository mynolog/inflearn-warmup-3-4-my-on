export interface MessageResponseDTO {
  id: string
  room_id: string
  sender_id: string
  content: string
  is_deleted: boolean
  is_read: boolean
  created_at: string
}
