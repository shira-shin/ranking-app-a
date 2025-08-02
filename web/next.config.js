/** @type {import('next').NextConfig} */
const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL,
};

Object.keys(env).forEach((key) => env[key] === undefined && delete env[key]);

const nextConfig = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en'
  },
  env,
};

module.exports = nextConfig;
