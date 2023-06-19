import type { RequestHandler } from './$types';
import { extract } from '@extractus/article-extractor';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	const link = data.get('link') as string;
	const article = await extract(link);
	return new Response(JSON.stringify(article));
};
