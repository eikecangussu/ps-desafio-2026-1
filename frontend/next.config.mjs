/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      ...(process.env.NEXT_PUBLIC_API_DOMAIN
        ? [
            {
              protocol: 'https',
              hostname: process.env.NEXT_PUBLIC_API_DOMAIN.replace(/^https?:\/\//, '').split('/')[0],
              pathname: '**',
            },
          ]
        : []),
    ],
  },
}

export default nextConfig
