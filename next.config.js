/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  disableStaticImages: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'cdn.shopify.com',
      'staging.api.gipermart.uz',
      'api.gipermart.uz',
    ],
  },
};

module.exports = nextConfig;
