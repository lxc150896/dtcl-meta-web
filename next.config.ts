import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ['cdn.jsdelivr.net', 'cdn.lolchess.gg', 'ddragon.leagueoflegends.com', 'raw.communitydragon.org', 'ddragon.dakgg.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // DTCL web moved from the site root to /tft; keep old URLs working.
      { source: '/:page(champions|items|augments|camps|instruct|rankings|summoners|synergies)', destination: '/tft/:page', statusCode: 301 },
      { source: '/:page(champions|camps)/:id', destination: '/tft/:page/:id', statusCode: 301 },
      // Leap & Lick: these URLs are declared in the app and on the stores.
      { source: '/leaplick', destination: '/games/leap-lick/support', statusCode: 301 },
      { source: '/leaplick/:page(privacy|support)', destination: '/games/leap-lick/:page', statusCode: 301 },
    ];
  },
  // deploy local
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  // deploy production
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     issuer: /\.[jt]sx?$/,
  //     use: ['@svgr/webpack'],
  //   });
  //   return config;
  // },
  // turbopack: {},
};

export default nextConfig;
