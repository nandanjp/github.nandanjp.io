import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    ...(process.env.NETLIFY && {
      loader: "custom",
      loaderFile: "./lib/netlify-image-loader.ts",
    }),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.nandan-hl.dev",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
