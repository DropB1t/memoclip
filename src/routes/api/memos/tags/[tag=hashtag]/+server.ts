import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { PAGE_SIZE } from '$lib/utils'

export const GET: RequestHandler = async ({ locals, url, params }) => {
	const session = await locals.getSession()

	if (!session) {
		throw error(401)
	}

	const start = url.searchParams.get('start')?.replace(' ', '+') || 'now()'

	const { data: memos, error: err } = await locals.supabase
		.rpc('get_memos_with_favorites', {
			current_user_id: session.user.id
		})
		.filter('tags', 'cs', `{"${params.tag}"}`)
		.lte('created_at', start)
		.order('created_at', { ascending: false })
		.limit(PAGE_SIZE + 1)

	if (err) {
		throw error(500, 'Something went wrong while fetching the feed')
	}

	const next = memos.length > PAGE_SIZE ? memos.pop()!.created_at : null

	return json({
		memos: memos,
		next: next
	})
}
