import { z } from 'zod'

// Name has a default value just to display something in the form.
export const user = z.object({
	email: z.string().email({
		message: 'Invalid email. Please enter a valid email address'
	}),
	username: z
		.string()
		.trim()
		.min(4, { message: 'The username must be 4 characters or more' })
		.max(10, { message: 'The username must be 10 characters or less' })
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
	/* followed_tags: z.string().array() */
})
