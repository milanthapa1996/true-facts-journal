/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com", "cdn.sanity.io","avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
