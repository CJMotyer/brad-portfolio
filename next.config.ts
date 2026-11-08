import type { NextConfig } from 'next';

// Every production build emits HTML/CSS/JS into out/; no Next.js server is needed.
const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
};

export default nextConfig;
