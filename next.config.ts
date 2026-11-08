import type { NextConfig } from 'next';

// Pages serves static files; keep the existing Vinext build for other hosts.
const nextConfig: NextConfig = process.env.GITHUB_PAGES === 'true'
  ? {
      output: 'export',
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
      trailingSlash: true,
    }
  : {};

export default nextConfig;
