import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals, params }) => {
	const { data: profile } = await locals.supabase
		.from('profiles')
		.select()
		.eq('username', params.user)
		.single()

	if (!profile) {
		throw redirect(303, '/')
	}

	const { count: posts_created } = await locals.supabase
		.from('memos')
		.select('*', { count: 'estimated', head: true })
		.eq('user_id', profile.id)

	const { count: posts_fav } = await locals.supabase
		.from('user_favorites')
		.select('*', { count: 'estimated', head: true })
		.eq('user_id', profile.id)

	return { profile, posts_created, posts_fav }
}) satisfies LayoutServerLoad
