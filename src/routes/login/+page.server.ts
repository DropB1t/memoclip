import { AuthApiError } from '@supabase/supabase-js'
import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession()
	if (session) {
		throw redirect(303, '/dashboard')
	}
}

export const actions: Actions = {
	default: async ({ url, request, locals }) => {
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

		const loginTo = url.searchParams.get('loginTo')

		if (loginTo) {
			throw redirect(302, `/${loginTo.slice(1)}`)
		}

		throw redirect(302, '/')
	}
}
