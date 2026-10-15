import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Animated page changes: see components/PageTransition.tsx.
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
