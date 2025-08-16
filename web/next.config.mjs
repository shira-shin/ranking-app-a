/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  // redirects や rewrites は置かない（middleware で統一）
};

export default nextConfig;
// CommonJS なら: module.exports = nextConfig;
