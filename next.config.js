/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["localhost", "plantdoc-pearl.vercel.app"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
