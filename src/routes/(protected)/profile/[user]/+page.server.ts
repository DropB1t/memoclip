import type { PageServerLoad } from './$types'
import type { Memo } from '$lib/db_types'

export const load: PageServerLoad = async ({ url, fetch }) => {
	const response = await fetch(`/api/feed?start=${url.searchParams.get('start') || ''}`)
	const { memos, next } = await response.json()

	return {
		memos: memos as Memo[],
		next: next as string
	}
}
