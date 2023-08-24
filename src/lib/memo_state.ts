import { writable } from 'svelte/store'
import type { Memo } from './db_types'

// note: this store will leak memory on the server! luckily, we're using
// serverless functions, which means we don't need to care — the
// function won't be kept alive long enough for it to matter.

const { subscribe, update } = writable(
	{} as {
		[id: number]: {
			pins: number
			is_favorite: boolean
		}
	}
)

export const state = { subscribe }

export function init_memos(memos: Memo[]) {
	update((lookup) => {
		for (const memo of memos) {
			if (!lookup[memo.id]) {
				lookup[memo.id] = {
					pins: memo.pins,
					is_favorite: memo.is_favorite
				}
			}
		}

		return lookup
	})
}

export function update_memo(id: number, pins: number, is_favorite: boolean) {
	update((lookup) => {
		lookup[id] = {
			pins,
			is_favorite
		}
		return lookup
	})
}
