import type { Actions, PageServerLoad } from './$types'
import { AuthApiError } from '@supabase/supabase-js'
import { superValidate, message } from 'sveltekit-superforms/server'
import { error, fail } from '@sveltejs/kit'
import { memo } from '$lib/schemas'

type Message = { status: 'error' | 'success' | 'warning'; text: string; id?: number }

export const load = (async () => {
	const form = await superValidate(memo)
	return { form }
}) satisfies PageServerLoad

export const actions: Actions = {
	createMemo: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession()

		if (!session) throw error(401)

		const form = await superValidate<typeof memo, Message>(request, memo)

		if (!form.valid) {
			return fail(400, { form })
		}

		const { data, error: err } = await supabase
			.from('memos')
			.insert({ ...form.data, user_id: session.user.id })
			.select('id')
			.single()

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(
					form,
					{ status: 'error', text: err.message },
					{
						status: 400
					}
				)
			}
			return message(
				form,
				{ status: 'error', text: err.message },
				{
					status: 500
				}
			)
		}

		return message(form, { status: 'success', text: 'Memo successfully created', id: data.id! })
	}
}
