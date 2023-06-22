// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Database } from '$lib/db_types'

type profile = {
	first_name: string
	followed_tags: string[] | null
	id: string
	last_name: string
	username: string
}

declare global {
	namespace App {
		// interface Error {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
			profile: profile | null
		}
	}
}

export {}
