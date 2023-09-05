const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const config = {
	plugins: [
		tailwindcss(),
		autoprefixer,
		cssnano({
			preset: 'default'
		})
	]
}

module.exports = config
