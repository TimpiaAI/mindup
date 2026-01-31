import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
      },
      {
        protocol: 'https',
        hostname: '**.ubbcluj.ro',
      },
      {
        protocol: 'https',
        hostname: '**.upb.ro',
      },
      {
        protocol: 'https',
        hostname: '**.utcluj.ro',
      },
      {
        protocol: 'https',
        hostname: '**.unibuc.ro',
      },
      {
        protocol: 'https',
        hostname: '**.uaic.ro',
      },
      {
        protocol: 'https',
        hostname: '**.upt.ro',
      },
    ],
  },
};

export default nextConfig;
