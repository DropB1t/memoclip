import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession()

	if (!session) {
		throw error(401)
	}

	const data = await request.formData()

	const pinned = data.get('pinned') === 'true'
	const id = Number(data.get('id'))

	if (pinned) {
		const { data: memo, error: err } = await locals.supabase
			.from('user_favorites')
			.insert({ user_id: session.user.id, memo_id: id })
		console.dir(memo)
		if (err) {
			console.dir(err)
			throw error(500, 'Something went wrong while fetching the memo')
		}
		return json({ success: true, code: 201 })
	} else {
		const { data: memo, error: err } = await locals.supabase
			.from('user_favorites')
			.delete()
			.eq('user_id', session.user.id)
			.eq('memo_id', id)
		console.dir(memo)
		if (err) {
			console.dir(err)
			throw error(500, 'Something went wrong while fetching the memo')
		}
		return json({ success: true, code: 201 })
	}
}
