const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  webpack: (config, { isServer }) => {
    // Force client bundle to use the installed React (19.2.5 with useEffectEvent)
    // instead of Next.js's internal canary which is missing that API.
    if (!isServer) {
      config.resolve.alias['react'] = path.resolve(__dirname, 'node_modules/react')
      config.resolve.alias['react-dom'] = path.resolve(__dirname, 'node_modules/react-dom')
    }
    return config
  },
}

module.exports = nextConfig
