// Load environment variables from the project root if a `.env` file exists.
const fs = require('fs');
const path = require('path');

const rootEnv = path.resolve(__dirname, '../.env');
if (fs.existsSync(rootEnv)) {
  const lines = fs.readFileSync(rootEnv, 'utf-8').split('\n');
  for (const line of lines) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
