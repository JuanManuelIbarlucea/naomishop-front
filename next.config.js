/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: false,
    },
  },
  images: {
    domains: ['s3-sa-east-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
