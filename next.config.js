/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force static generation for all pages
  output: "export",
  // Or skip problematic page from static generation
  experimental: {
    // Optional: exclude application from static generation
    // outputFileTracingExcludes: {
    //   '/application': ['**']
    // }
  },
};

module.exports = nextConfig;
