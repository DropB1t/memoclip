import type { Actions, PageServerLoad } from './$types'
import { AuthApiError } from '@supabase/supabase-js'
import { superValidate, message } from 'sveltekit-superforms/server'
import { fail, redirect } from '@sveltejs/kit'
import { memo } from '$lib/schemas'

export const load = (async () => {
	const form = await superValidate(memo)
	return { form }
}) satisfies PageServerLoad

export const actions: Actions = {
	createMemo: async ({ request, locals: { supabase, user } }) => {
		const form = await superValidate(request, memo)

		//console.log(form)

		if (!form.valid) {
			return fail(400, { form })
		}

		const { error: err } = await supabase.from('memos').insert({ ...form.data, user_id: user!.id })

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, err.message)
			}
			return message(form, err.message, {
				status: 500
			})
		}

		throw redirect(303, '/')
	}
}
