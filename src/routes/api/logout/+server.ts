import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession()

	if (!session) {
		throw error(401)
	}

	const { error: err } = await supabase.auth.signOut()

	if (err) {
		throw error(500, 'Something went wrong during the log out.')
	}

	throw redirect(303, '/')
}
