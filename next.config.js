/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://assets.pokemon.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
