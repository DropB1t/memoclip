import type { ParamMatcher } from '@sveltejs/kit'

export const match = ((param) => {
	return /^[a-zA-Z0-9_]+$/.test(param)
}) satisfies ParamMatcher
