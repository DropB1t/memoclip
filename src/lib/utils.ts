import type { RequestEvent } from '@sveltejs/kit'

export function handleLoginRedirect(event: RequestEvent) {
	const fromUrl = event.url.pathname + event.url.search
	return `/login?redirectTo=${fromUrl}`
}
