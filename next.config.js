/** @type {import('next').NextConfig} */

const path = require("path")
const withSass = require("@zeit/next-sass")
const nextConfig = {
	reactStrictMode: true,
}

module.exports = withSass({
	cssModules: true,
})

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	nextConfig,
}
