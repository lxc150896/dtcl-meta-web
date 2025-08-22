import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.jsdelivr.net', 'cdn.lolchess.gg', 'ddragon.leagueoflegends.com', 'raw.communitydragon.org', 'ddragon.dakgg.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        pathname: '/**',
      },
    ],
  },
  // deploy local
  // turbopack: {
  //   rules: {
  //     '*.svg': {
  //       loaders: [
  //         {
  //           loader: '@svgr/webpack',
  //           options: {
  //             icon: true,
  //           },
  //         },
  //       ],
  //       as: '*.js',
  //     },
  //   },
  // },
  // deploy production
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
