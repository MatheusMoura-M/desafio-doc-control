import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignora a dependência de 'canvas' no lado do servidor
      config.externals.push("canvas")
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      }
    }
    return config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
}

export default nextConfig
