import { config } from 'dotenv';
config();
/** @type {import('next').NextConfig} */


const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://maps.googleapis.com/:path*', // Proxy to Google Maps API
        },
      ];
    },
  };
  

export default nextConfig;


