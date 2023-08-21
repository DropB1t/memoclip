import type { Memo } from '$lib/db_types'
import { error, fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const actions: Actions = {
	deleteMemo: async ({ locals, request }) => {
		const session = await locals.getSession()

		if (!session) throw error(401)

		const data = await request.formData()

		const id = Number(data.get('id'))
		if (!id) return fail(412) // Precondition Failed

		const { error: err } = await locals.supabase.from('memos').delete().eq('id', id)

		if (err) {
			return fail(404, {
				err: true,
				err_msg: 'Failed in deleting the memo'
			})
		}

		throw redirect(303, '/')
	}
}

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`/api/memos/${params.id}`)
	const memo: Memo = await response.json()

	return { memo }
}) satisfies PageServerLoad
