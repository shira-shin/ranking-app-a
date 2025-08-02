/** @type {import('next').NextConfig} */

const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
  NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ?? process.env.GOOGLE_OAUTH_CLIENT_ID,
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
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react$': require.resolve('react'),
      'react-dom$': require.resolve('react-dom'),
      'react/jsx-runtime$': require.resolve('react/jsx-runtime'),
      'react/jsx-dev-runtime$': require.resolve('react/jsx-dev-runtime'),
      'react-dom/client$': require.resolve('react-dom/client'),
      'react-dom/server$': require.resolve('react-dom/server'),
      'next-auth/react$': require.resolve('next-auth/react'),
    };
    return config;
  },
};

module.exports = nextConfig;
