// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Database, User } from '$lib/db_types'

declare global {
	namespace App {
		// interface Error {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
			user?: User
		}
		interface PageData {
			session: Session | null
		}
	}
}

export {}
