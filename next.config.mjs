import { withContentlayer } from 'next-contentlayer';

import i18nConfig from './next-i18next.config.js';

const { i18n } = i18nConfig;

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer({
  reactStrictMode: true,
  swcMinify: true,
  // Support svg import
  // ref: https://dev.to/dolearning/importing-svgs-to-next-js-nna
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    // Enable modern image formats
    formats: ['image/avif', 'image/webp'],
  },
  i18n,
});

export default nextConfig;
