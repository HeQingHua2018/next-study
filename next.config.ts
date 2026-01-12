import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        port: '',
        pathname: '/plus-assets/img/ecommerce-images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
