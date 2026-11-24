/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreBuildErrors:true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
    domains: [process.env.NEXT_PUBLIC_API_DOMAIN, 'via.placeholder.com'],
  },

}

export default nextConfig
