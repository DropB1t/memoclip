import type { PageLoad } from './$types'
import type { Memo } from '$lib/db_types'

export const load: PageLoad = async ({ url, fetch, params }) => {
	const response = await fetch(
		`/api/memos/${params.user}/fav?start=${url.searchParams.get('start') || ''}`
	)
	const { memos, next } = await response.json()

	return {
		memos: memos as Memo[],
		next: next as string
	}
}
