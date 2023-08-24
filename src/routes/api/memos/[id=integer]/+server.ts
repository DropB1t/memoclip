import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.getSession()

	if (!session) {
		throw error(401)
	}

	const { data: memo, error: err } = await locals.supabase
		.rpc('get_memos_with_favorites', {
			current_user_id: session.user.id
		})
		.eq('id', params.id)
		.single()

	if (err) {
		if (!memo && (err.code = 'PGRST116'))
			throw error(404, {
				message: `Memo id:${params.id} has not been found`
			})
		throw error(500, 'Something went wrong while fetching the memo')
	}

	return json(memo)
}
