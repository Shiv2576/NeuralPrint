const nextConfig = {
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optional: Increase static page generation timeout
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;

export default nextConfig;
