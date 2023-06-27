import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import type { Memo } from '$lib/db_types'

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme')
		const redirectTo = url.searchParams.get('redirectTo')

		if (theme && (theme === 'night' || theme === 'bumblebee')) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 31536000 /* 1 year */
			})
		}

		throw redirect(303, redirectTo ?? '/')
	}
}

export const load: PageServerLoad = async ({ url, fetch }) => {
	const response = await fetch(`/api/feed?start=${url.searchParams.get('start') || ''}`)
	const { memos, next } = await response.json()

	return {
		memos: memos as Memo[],
		next: next as string
	}
}
