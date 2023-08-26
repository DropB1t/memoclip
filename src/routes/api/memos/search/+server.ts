import type { RequestHandler } from './$types'
import { PAGE_SIZE } from '$lib/utils.js'
import { json, error } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ locals, url }) => {
	const session = await locals.getSession()

	if (!session) {
		throw error(401)
	}

	const query = url.searchParams.get('query')
	if (!query) throw error(400, 'Pass valid query parameter')

	const start = url.searchParams.get('start')?.replace(' ', '+') || 'now()'

	const { data: memos, error: err } = await locals.supabase
		.rpc('get_memos_with_favorites', {
			current_user_id: locals.user?.id ?? null
		})
		.textSearch('fts', `'${query.trim()}'`)
		.lte('created_at', start)
		.limit(PAGE_SIZE + 1)

	if (err) {
		console.dir(err)
		throw error(500, 'Something went wrong while fetching the feed')
	}
	const next = memos.length > PAGE_SIZE ? memos.pop()!.created_at : null

	return json({
		memos: memos,
		next: next
	})
}
