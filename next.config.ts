import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:4000',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
