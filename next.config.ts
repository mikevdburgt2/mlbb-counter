/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone', // Dit helpt vaak bij Vercel
  images: {
    unoptimized: true, // Tijdelijk voor simpele sites
  },
};

export default nextConfig;
