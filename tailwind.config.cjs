const daisyui = require('daisyui')
const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	plugins: [forms, typography, daisyui],

	daisyui: {
		themes: ['bumblebee', 'night'],
		darkTheme: 'night',
		logs: false
	}
}

module.exports = config
