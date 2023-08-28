import type { ToastOptions } from 'svelte-french-toast'

export const PAGE_SIZE = 5

export function handleLoginRedirect(url: URL) {
	const fromUrl = url.pathname + url.search
	return `/login?loginTo=${fromUrl}`
}

export function convertNameToInitials(firstName: string, lastName: string): string {
	const firstInitial = Array.from(firstName)[0]
	const lastInitial = Array.from(lastName)[0]
	return `${firstInitial}${lastInitial}`
}

export const toast_opt: ToastOptions = {
	position: 'top-center'
}
