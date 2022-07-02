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
	images: {
		domains: ["cdn.sanity.io"],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	nextConfig,
}
