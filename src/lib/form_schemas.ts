import { z } from 'zod'

export const user = z.object({
	email: z.string().email({
		message: 'Invalid email. Please enter a valid email address'
	}),
	username: z
		.string()
		.trim()
		.min(4, { message: 'The username must be 4 characters or more' })
		.max(25, { message: 'The username must be 25 characters or less' })
		.regex(/^[a-zA-Z0-9_]+$/, 'The username must contain only letters, numbers and underscore (_)'),
	firstName: z
		.string()
		.trim()
		.min(1)
		.regex(/^[A-Za-z]{1,}$/),
	lastName: z
		.string()
		.trim()
		.min(1)
		.regex(/^[A-Za-z]{1,}$/),
	password: z.string().trim().min(8, { message: 'Password must contain at least 8 characters' })
})

export const memo = z.object({
	title: z.string().trim().nonempty().max(70),
	description: z.string().trim().nonempty(),
	link: z.string().url(),
	image_url: z.string().url().optional(),
	tags: z
		.array(
			z
				.string()
				.trim()
				.toLowerCase()
				.min(2)
				.max(40)
				.regex(/^[a-zA-Z0-9_]+$/)
		)
		.min(1)
		.max(25)
})

export const memo_to_edit = memo.extend({
	id: z.number().positive()
})

export type MemoExtractor = z.infer<typeof memo>
