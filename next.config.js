/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resource.pokemon-home.com",
        pathname: "/battledata/img/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
