import type { Memo } from '$lib/db_types'
import type { PageServerLoad } from './$types'

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`/api/memos/${params.id}`)
	const memo: Memo = await response.json()
	console.dir(memo)
	return { memo }
}) satisfies PageServerLoad
