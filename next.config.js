/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: true,
}

const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true
})

module.exports = {
  /* Add Your Scss File Folder Path Here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  nextConfig
}






// module.exports = nextConfig
