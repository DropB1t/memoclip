import type { Actions, PageServerLoad } from './$types'
import { AuthApiError } from '@supabase/supabase-js'
import { superValidate, message } from 'sveltekit-superforms/server'
import { fail, redirect } from '@sveltejs/kit'
import { memo_to_edit } from '$lib/form_schemas'
import type { Memo } from '$lib/db_types'

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/memos/${params.id}`)
	const memo_data: Memo = await response.json()
	const form = await superValidate(memo_data, memo_to_edit)

	return { form }
}) satisfies PageServerLoad

export const actions: Actions = {
	updateMemo: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, memo_to_edit)

		if (!form.valid) {
			return fail(400, { form })
		}

		let { id, ...data } = form.data

		if (!id || !data.link)
			return message(form, 'Id or Link has been compromised, please retry again', {
				status: 412
			}) // Precondition Failed

		const { error: err } = await supabase
			.from('memos')
			.update({ ...data })
			.eq('id', id)

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, err.message)
			}
			return message(form, err.message, {
				status: 500
			})
		}

		throw redirect(303, `/memo/${form.data.id}`)
	}
}
