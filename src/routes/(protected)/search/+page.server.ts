import type { Memo } from '$lib/db_types'
import type { PageServerLoad } from './$types'

export const load = (async ({ url, fetch }) => {
	let query = url.searchParams.get('query')

	if (query) {
		const response = await fetch(
			`/api/memos/search?query=${query}&start=${url.searchParams.get('start') || ''}`
		)
		const { memos, next } = await response.json()

		return {
			memos: memos as Memo[],
			next: next as string,
			query: query as string
		}
	}

	return {
		memos: [] as Memo[],
		next: null,
		query: ''
	}
}) satisfies PageServerLoad
