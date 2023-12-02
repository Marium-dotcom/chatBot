/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = { 
//     eslint: { 
//       ignoreDuringBuilds: true, 
//     }, 
// }

module.exports = {
  reactStrictMode: true, 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
}

