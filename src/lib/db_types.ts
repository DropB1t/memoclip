export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      memos: {
        Row: {
          description: string
          id: number
          image_url: string | null
          likes: number | null
          link: string
          tags: string[]
          title: string
          user_id: string
        }
        Insert: {
          description: string
          id?: number
          image_url?: string | null
          likes?: number | null
          link: string
          tags: string[]
          title: string
          user_id: string
        }
        Update: {
          description?: string
          id?: number
          image_url?: string | null
          likes?: number | null
          link?: string
          tags?: string[]
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          first_name: string
          followed_tags: string[] | null
          id: string
          last_name: string
          username: string
        }
        Insert: {
          first_name: string
          followed_tags?: string[] | null
          id: string
          last_name: string
          username: string
        }
        Update: {
          first_name?: string
          followed_tags?: string[] | null
          id?: string
          last_name?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_favorites: {
        Row: {
          memo_id: number
          user_id: string
        }
        Insert: {
          memo_id?: number
          user_id: string
        }
        Update: {
          memo_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_memo_id_fkey"
            columns: ["memo_id"]
            referencedRelation: "memos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
