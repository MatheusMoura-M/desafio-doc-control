/** @type {import('next').NextConfig} */

const nextConfig = {
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "desafio-doc-control.s3.sa-east-1.amazonaws.com",
      },
    ],
  },
}

export default nextConfig
