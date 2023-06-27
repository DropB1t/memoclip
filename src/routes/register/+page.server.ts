import { AuthApiError } from '@supabase/supabase-js'
import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { user } from '$lib/form_schemas'
import { message, superValidate } from 'sveltekit-superforms/server'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession()
	if (session) {
		throw redirect(303, '/')
	}

	const form = await superValidate(user)

	return { form }
}

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, user)

		if (!form.valid) {
			return fail(400, { form })
		}

		const { data: profileData, error: _profileError } = await supabase
			.from('profiles')
			.select('id')
			.eq('username', form.data.username)
			.single()

		if (profileData) {
			return message(form, 'Username has been taken')
		}

		const { error: err } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					username: form.data.username,
					first_name: form.data.firstName,
					last_name: form.data.lastName
				}
			}
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, err.message)
			}
			return message(form, err.message, {
				status: 500
			})
		}

		throw redirect(303, '/login')
	}
}
