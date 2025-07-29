/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://hsgefnzqzmubkazvxyqw.supabase.co/storage/v1/object/public/**"
      ),
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  //output: "export",
};

export default nextConfig;
