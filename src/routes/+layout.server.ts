import type { User } from '$lib/db_types'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession()

	const user = session
		? ((await locals.supabase.from('profiles').select().eq('id', session.user.id).single())
				.data as User)
		: null

	locals.user = user

	return { session, user }
}
