const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_OUTPUT_MODE === 'export';

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    // Habilita otimização de imagens estáticas
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  output: isStaticExport ? 'export' : 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Melhora code splitting
  webpack: (config, { isServer }) => {
    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      // Separa componentes de UI em bundle separado
      ui: {
        test: /[\\/]components[\\/]ui[\\/]/,
        name: 'ui-components',
        priority: 10,
        reuseExistingChunk: true,
      },
      // Separa seções em bundle separado
      sections: {
        test: /[\\/]components[\\/]sections[\\/]/,
        name: 'sections',
        priority: 9,
        reuseExistingChunk: true,
      },
      // Separa Framer Motion em bundle separado (lazy loading)
      motion: {
        test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
        name: 'framer-motion',
        priority: 8,
        reuseExistingChunk: true,
      },
    };
    return config;
  },
};

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG || 'gabriel-db',
  project: process.env.SENTRY_PROJECT || 'javascript-nextjs',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
