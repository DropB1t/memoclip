import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirectTo');

		if (theme && (theme === 'night' || theme === 'bumblebee')) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 31536000 /* 1 year */
			});
		}

		throw redirect(303, redirectTo ?? '/');
	}
};
