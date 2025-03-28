export interface RoomResponse {
  room: RoomResponseDTO
}

export interface RoomResponseDTO {
  id: string
  userA_id: string
  userB_id: string
}
