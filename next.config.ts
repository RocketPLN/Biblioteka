import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     net: false,
  //   };

  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wolnelektury.pl",
        port: "",
        pathname: "/media/book/cover_clean/**",
      },
    ],
  },
};

export default nextConfig;
