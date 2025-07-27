/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL(process.env.SUPABASE_STORAGE_URL)],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // output: "export",
};

export default nextConfig;
