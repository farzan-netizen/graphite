import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'


const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const assetPrefix = isDev ? undefined : process.env.ASSET_PREFIX || ''
  const basePath = isDev ? '' : (process.env.BASE_PATH || '')

   /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    output: 'standalone',
    assetPrefix,
    basePath,
    reactCompiler: true,
    // TODO: Add remote patterns for images
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  }
  return nextConfig
}

export default nextConfig