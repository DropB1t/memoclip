import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { handleLoginRedirect } from '$lib/utils'

export const load = (async ({ parent, url }) => {
	const { session, user } = await parent()

	if (!session) {
		throw redirect(303, handleLoginRedirect(url))
	}

	return { session, user }
}) satisfies LayoutServerLoad
