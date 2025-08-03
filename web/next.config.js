/** @type {import('next').NextConfig} */
const path = require('path');

const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
  // Expose the Google client ID to the browser. Support both the standard
  // GOOGLE_CLIENT_ID naming and the older GOOGLE_OAUTH_CLIENT_ID names.
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
    process.env.GOOGLE_CLIENT_ID ??
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ??
    process.env.GOOGLE_OAUTH_CLIENT_ID,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

Object.keys(env).forEach((key) => env[key] === undefined && delete env[key]);

const nextConfig = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  env,
  experimental: {
    turbo: {
      // Mirror the webpack aliases in Turbopack so that dev builds also
      // resolve to the local React installation. Without this, Windows
      // environments that have a global copy of React can end up loading
      // two different React instances and trigger "Invalid hook call"
      // errors at runtime.
      resolveAlias: {
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    },
  },
  webpack: (config) => {
    // Ensure all packages, including ones hoisted outside this project, use
    // the same React instance to avoid "Invalid hook call" errors.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    };
    return config;
  },
};

module.exports = nextConfig;
