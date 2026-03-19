/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Tell Next.js not to bundle these on server side
  serverExternalPackages: ["sanity"],
};

export default nextConfig;
