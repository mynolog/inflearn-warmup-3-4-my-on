export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      mydrop_files: {
        Row: {
          createdAt: string
          id: string
          imageId: string
          imageUrl: string
          name: string
          originalName: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          imageId: string
          imageUrl: string
          name: string
          originalName: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          imageId?: string
          imageUrl?: string
          name?: string
          originalName?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
      myon_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_deleted: boolean
          is_read: boolean
          room_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_read?: boolean
          room_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_read?: boolean
          room_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "myon_messages_sender_id_fkey1"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "myon_users"
            referencedColumns: ["id"]
          },
        ]
      }
      myon_rooms: {
        Row: {
          created_at: string
          id: string
          last_message_id: string | null
          updated_at: string
          userA_id: string
          userB_id: string
        }
        Insert: {
          created_at?: string
          id: string
          last_message_id?: string | null
          updated_at?: string
          userA_id: string
          userB_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_id?: string | null
          updated_at?: string
          userA_id?: string
          userB_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "myon_rooms_last_message_id_fkey"
            columns: ["last_message_id"]
            isOneToOne: false
            referencedRelation: "myon_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myon_rooms_userA_id_fkey"
            columns: ["userA_id"]
            isOneToOne: false
            referencedRelation: "myon_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "myon_rooms_userB_id_fkey"
            columns: ["userB_id"]
            isOneToOne: false
            referencedRelation: "myon_users"
            referencedColumns: ["id"]
          },
        ]
      }
      myon_users: {
        Row: {
          avatar_url: string
          created_at: string
          email: string
          id: string
          nickname: string
          provider: string
          username: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          email: string
          id: string
          nickname: string
          provider: string
          username: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          email?: string
          id?: string
          nickname?: string
          provider?: string
          username?: string
        }
        Relationships: []
      }
      myreel_movies: {
        Row: {
          id: string
          image_url: string
          like_count: number
          order_index: number
          overview: string
          popularity: number
          release_date: string
          slug: string
          title: string
          vote_average: number
        }
        Insert: {
          id?: string
          image_url: string
          like_count?: number
          order_index?: number
          overview: string
          popularity: number
          release_date: string
          slug: string
          title: string
          vote_average: number
        }
        Update: {
          id?: string
          image_url?: string
          like_count?: number
          order_index?: number
          overview?: string
          popularity?: number
          release_date?: string
          slug?: string
          title?: string
          vote_average?: number
        }
        Relationships: []
      }
      todos: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: number
          title: string
          updated_at: string | null
        }
        Insert: {
          completed: boolean
          completed_at?: string | null
          created_at: string
          id?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      email_check_view: {
        Row: {
          email: string | null
        }
        Insert: {
          email?: string | null
        }
        Update: {
          email?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_movies_with_like_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          movie_slug: string
          title: string
          image_url: string
          like_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
