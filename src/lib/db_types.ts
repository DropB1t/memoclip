export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type User = {
	first_name: string
	followed_tags: string[] | null
	id: string
	last_name: string
	username: string
} | null

export type Memo = {
	id: number
	title: string
	description: string
	image_url: string
	link: string
	tags: string[]
	pins: number
	user_id: string
	created_at: string
	profile_username: string
	is_favorite: boolean
}

export interface Database {
	public: {
		Tables: {
			memos: {
				Row: {
					created_at: string
					description: string
					id: number
					image_url: string | null
					link: string
					pins: number | null
					tags: string[]
					title: string
					user_id: string
				}
				Insert: {
					created_at?: string
					description: string
					id?: number
					image_url?: string | null
					link: string
					pins?: number | null
					tags: string[]
					title: string
					user_id: string
				}
				Update: {
					created_at?: string
					description?: string
					id?: number
					image_url?: string | null
					link?: string
					pins?: number | null
					tags?: string[]
					title?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'memos_user_id_fkey'
						columns: ['user_id']
						referencedRelation: 'users'
						referencedColumns: ['id']
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
						foreignKeyName: 'profiles_id_fkey'
						columns: ['id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
			user_favorites: {
				Row: {
					added_at: string
					memo_id: number
					user_id: string
				}
				Insert: {
					added_at?: string
					memo_id?: number
					user_id: string
				}
				Update: {
					added_at?: string
					memo_id?: number
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'user_favorites_memo_id_fkey'
						columns: ['memo_id']
						referencedRelation: 'memos'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'user_favorites_memo_id_fkey'
						columns: ['memo_id']
						referencedRelation: 'memo_and_creator'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'user_favorites_user_id_fkey'
						columns: ['user_id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
		}
		Views: {
			memo_and_creator: {
				Row: {
					created_at: string | null
					description: string | null
					id: number | null
					image_url: string | null
					link: string | null
					pins: number | null
					profile_username: string | null
					tags: string[] | null
					title: string | null
					user_id: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'memos_user_id_fkey'
						columns: ['user_id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
		}
		Functions: {
			get_favorites: {
				Args: {
					current_user_id: string
				}
				Returns: {
					id: number
					title: string
					description: string
					image_url: string
					link: string
					tags: string[]
					pins: number
					user_id: string
					created_at: string
					profile_username: string
					is_favorite: boolean
					added_at: string
				}[]
			}
			get_memos_with_favorites: {
				Args: {
					current_user_id: string | null
				}
				Returns: {
					id: number
					title: string
					description: string
					image_url: string
					link: string
					tags: string[]
					pins: number
					user_id: string
					created_at: string
					profile_username: string
					is_favorite: boolean
				}[]
			}
			increment_pins: {
				Args: {
					memo_id: number
				}
				Returns: undefined
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
