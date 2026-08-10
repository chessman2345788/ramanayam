import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/occasions/:path*",
        destination: "/festivals/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
