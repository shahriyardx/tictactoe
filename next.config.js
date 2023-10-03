/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["api.dicebear.com"]
  }
}

module.exports = nextConfig
