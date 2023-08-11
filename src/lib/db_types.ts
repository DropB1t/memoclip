export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type User = {
	first_name: string
	followed_tags: string[]
	id: string
	last_name: string
	username: string
}

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
					followed_tags: string[]
					id: string
					last_name: string
					username: string
				}
				Insert: {
					first_name: string
					followed_tags?: string[]
					id: string
					last_name: string
					username: string
				}
				Update: {
					first_name?: string
					followed_tags?: string[]
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
						foreignKeyName: 'user_favorites_user_id_fkey'
						columns: ['user_id']
						referencedRelation: 'users'
						referencedColumns: ['id']
					}
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			get_favorites:
				| {
						Args: {
							username: string
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
				| {
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
