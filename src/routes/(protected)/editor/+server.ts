import type { RequestHandler } from './$types'
import { extract, type ParserOptions } from '@extractus/article-extractor'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
	const link = await request.text()
	/* const link = data.get('link') as string */
	try {
		const article = await extract(link, { contentLengthThreshold: 0 } as ParserOptions)
		if (article) {
			return json({
				title: article.title,
				description: article.description,
				link: article.url,
				tags: [],
				image_url: article.image && article.image != '' ? article.image : null
			})
		}
		return json(null)
	} catch (err) {
		return json(null)
	}
}
