import type { PageServerLoad } from './$types'
import type { Memo } from '$lib/db_types'

export const load: PageServerLoad = async ({ url, fetch, params }) => {
	const fetchMemo = async () => {
		const response = await fetch(
			`/api/memos/tags/${params.tag}?start=${url.searchParams.get('start') || ''}`
		)
		const { memos, next } = await response.json()
		return {
			memos: memos as Memo[],
			next: next as string
		}
	}

	return {
		tag: params.tag as string,
		streamed: { data: fetchMemo() }
	}
}
