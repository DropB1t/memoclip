import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals: { getSession, user } }) => {
	return { session: await getSession(), user: user }
}) satisfies LayoutServerLoad
