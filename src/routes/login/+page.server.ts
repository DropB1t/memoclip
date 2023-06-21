import { AuthApiError } from '@supabase/supabase-js'
import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'

export const actions: Actions = {
	login: async ({ url, request, locals }) => {
		const body = Object.fromEntries(await request.formData())

		const { error: err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, { error: 'Invalid credentials' })
			}
			return fail(500, { error: 'Server error. Please try again' })
		}

		const redirectTo = url.searchParams.get('redirectTo')

		if (redirectTo) {
			throw redirect(302, `/${redirectTo.slice(1)}`)
		}

		throw redirect(302, '/')
	}
}
