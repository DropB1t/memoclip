import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ parent }) => {
	const { session, user } = await parent()

	if (!session) {
		throw redirect(303, '/')
	}

	return { session, user }
}) satisfies LayoutServerLoad
