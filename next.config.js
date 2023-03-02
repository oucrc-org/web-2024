/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['cross-fetch'],
  },
  images: {
    domains: ['images.microcms-assets.io'],
  },
};

module.exports = nextConfig;
