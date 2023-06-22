const daisyui = require('daisyui')
const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: 'Zen Kaku Gothic New, Helvetica, Arial, sans-serif',
				mono: 'Roboto Mono Variable, ui-monospace, monospace'
			}
		}
	},

	plugins: [forms, typography, daisyui],

	daisyui: {
		themes: ['bumblebee', 'night'],
		darkTheme: 'night',
		logs: false
	}
}

module.exports = config
