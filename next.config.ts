import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Creates a static site in an 'out' folder
  basePath: '/portfolio', 
    images: {
    unoptimized: true, // Allows 'next/image' to work with static sites
    },
  };

export default nextConfig;