import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out2",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
