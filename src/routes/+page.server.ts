import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import type { Memo } from '$lib/db_types'

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme')
		const redirectTo = url.searchParams.get('redirectTo')

		if (theme && (theme === 'night' || theme === 'bumblebee')) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 31536000 /* 1 year */
			})
		}

		throw redirect(303, redirectTo ?? '/')
	},
	toggleFav: async ({ request, locals }) => {
		const session = await locals.getSession()

		if (!session) throw error(401)

		const data = await request.formData()

		const pinned = data.get('pinned') === 'true'
		const id = Number(data.get('id'))

		if (!id) return fail(412) // Precondition Failed

		if (pinned) {
			const { error: err } = await locals.supabase
				.from('user_favorites')
				.insert({ user_id: session.user.id, memo_id: id, added_at: 'now()' })
				.select()

			if (err) {
				//console.dir(err)
				if (err.code === '23503') {
					return fail(404, {
						err: true,
						err_msg: 'The memo you try to add to favorites does not exist'
					})
				}
				throw error(500, 'Something went wrong :(')
			}
			return { action: 'pinned' }
		} else {
			const { error: err } = await locals.supabase
				.from('user_favorites')
				.delete()
				.eq('user_id', session.user.id)
				.eq('memo_id', id)

			if (err) {
				if (err.code === '23503') {
					return fail(404, {
						err: true,
						err_msg: 'The memo you try to add to favorites does not exist'
					})
				}
				throw error(500, 'Something went wrong :(')
			}
			return { action: 'unpinned' }
		}
	},
	toggleFollow: async ({ request, locals }) => {
		const session = await locals.getSession()

		if (!session) throw error(401)

		const data = await request.formData()

		const followed = data.get('followed') === 'true'
		const tag = String(data.get('tag'))
		const id = session.user.id

		if (!tag || !/^[a-zA-Z0-9_]+$/.test(tag)) return fail(412) // Precondition Failed

		if (followed) {
			const { error: err } = await locals.supabase.rpc('append_tag', {
				new_tag: tag,
				id
			})

			if (err) {
				/* return fail(404, {
					err: true,
					err_msg: 'Failed in following the tag'
				}) */

				throw error(500, 'Something went wrong :(')
			}
			return { success: true }
		} else {
			const { error: err } = await locals.supabase.rpc('remove_tag', {
				tag,
				id
			})

			if (err) {
				throw error(500, 'Something went wrong :(')
			}
			return { success: true }
		}
	}
}

export const load: PageServerLoad = async ({ url, fetch }) => {
	const response = await fetch(`/api/memos/feed?start=${url.searchParams.get('start') || ''}`)
	const { memos, next } = await response.json()

	return {
		memos: memos as Memo[],
		next: next as string
	}
}
