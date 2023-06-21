import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { handleLoginRedirect } from '$lib/utils'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, type Handle, type ResolveOptions, error } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
	const opts: ResolveOptions = {}

	let theme: string | null = null
	const newTheme = event.url.searchParams.get('theme')
	const cookieTheme = event.cookies.get('colortheme')

	theme = newTheme ? newTheme : cookieTheme ? cookieTheme : null

	if (theme) {
		opts.transformPageChunk = ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	}

	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	})

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	opts.filterSerializedResponseHeaders = (name) => {
		return name === 'content-range'
	}

	if (event.url.pathname.startsWith('/dashboard')) {
		const session = await event.locals.getSession()
		if (!session) {
			throw redirect(303, handleLoginRedirect(event))
		}
	}

	if (event.url.pathname.startsWith('/api') && event.request.method === 'POST') {
		const session = await event.locals.getSession()
		if (!session) {
			throw error(303, '/')
		}
	}

	return await resolve(event, opts)
}) satisfies Handle
