import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import type { Memo } from '$lib/db_types'

export const load: PageLoad = async ({ url, fetch, parent }) => {
	const { user } = await parent()

	if (!user) throw redirect(307, '/login')

	const response = await fetch(
		`/api/memos/${user.username}/dashboard_feed?start=${url.searchParams.get('start') || ''}`
	)
	const { memos, next } = await response.json()

	return {
		memos: memos as Memo[],
		next: next as string
	}
}
