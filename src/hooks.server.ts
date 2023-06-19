import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle, ResolveOptions } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const opts: ResolveOptions = {};

	let theme: string | null = null;
	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('colortheme');

	theme = newTheme ? newTheme : cookieTheme ? cookieTheme : null;

	if (theme) {
		opts.transformPageChunk = ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`);
	}

	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	opts.filterSerializedResponseHeaders = (name) => {
		return name === 'content-range';
	};

	return await resolve(event, opts);
}) satisfies Handle;
