import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Optimize production build
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;


