import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      }
    }
    return config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
}

export default nextConfig
