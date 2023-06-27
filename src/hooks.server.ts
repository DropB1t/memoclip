import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { redirect, type Handle, type ResolveOptions, error } from '@sveltejs/kit'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { handleLoginRedirect } from '$lib/utils'
import type { Database, User } from '$lib/db_types'

export const handle = (async ({ event, resolve }) => {
	const opts: ResolveOptions = {}

	let theme: string | null = null
	const newTheme = event.url.searchParams.get('theme')
	const cookieTheme = event.cookies.get('colortheme')

	theme = newTheme ? newTheme : cookieTheme ? cookieTheme : null

	if (theme) {
		opts.transformPageChunk = ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	}

	event.locals.supabase = createSupabaseServerClient<Database>({
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

	const session = await event.locals.getSession()

	if (event.route.id?.startsWith('/(protected)')) {
		if (!session) {
			throw redirect(303, handleLoginRedirect(event))
		}
	}

	/* if (event.url.pathname.startsWith('/api') && event.request.method === 'POST') {
		if (!session) {
			throw error(303, '/')
		}
	} */

	if (session) {
		event.locals.user = (
			await event.locals.supabase.from('profiles').select().eq('id', session.user.id).single()
		).data as User
	}

	return await resolve(event, opts)
}) satisfies Handle
