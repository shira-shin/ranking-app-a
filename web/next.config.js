/** @type {import('next').NextConfig} */
const path = require('path');

const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
    process.env.GOOGLE_CLIENT_ID ??
    process.env.GOOGLE_CLIENT_ID_NEW ??
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ??
    process.env.GOOGLE_OAUTH_CLIENT_ID,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
};
Object.keys(env).forEach((k) => env[k] === undefined && delete env[k]);

module.exports = {
  i18n: { locales: ['en', 'ja'], defaultLocale: 'en' },
  reactStrictMode: true,
  optimizeFonts: false,
  // experimental: { instrumentationHook: true }, // ← これを消す
  env,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(__dirname, './node_modules/react/jsx-dev-runtime.js'),
    };
    return config;
  },
};
