/** @type {import('next').NextConfig} */
const path = require('path');

const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
  // Expose the Google client ID to the browser. Support the default
  // GOOGLE_CLIENT_ID name along with the legacy GOOGLE_CLIENT_ID_NEW and
  // GOOGLE_OAUTH_CLIENT_ID variants.
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
    process.env.GOOGLE_CLIENT_ID ??
    process.env.GOOGLE_CLIENT_ID_NEW ??
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ??
    process.env.GOOGLE_OAUTH_CLIENT_ID,
  // Provide a sensible default so NextAuth can run during local development
  // without requiring the developer to set NEXTAUTH_URL explicitly.
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
};

Object.keys(env).forEach((key) => env[key] === undefined && delete env[key]);

const nextConfig = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  optimizeFonts: false,
  experimental: {
    instrumentationHook: true,
    optimizePackageImports: [],
  },
  env,
  webpack: (config) => {
    // Ensure all packages, including ones hoisted outside this project, use
    // the same React instance to avoid "Invalid hook call" errors.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(
        __dirname,
        './node_modules/react/jsx-runtime.js'
      ),
      'react/jsx-dev-runtime': path.resolve(
        __dirname,
        './node_modules/react/jsx-dev-runtime.js'
      ),
    };
    return config;
  },
};

module.exports = nextConfig;
