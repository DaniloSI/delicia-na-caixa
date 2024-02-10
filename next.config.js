/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["raw-loader"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      handlebars: "handlebars/dist/handlebars.js",
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/pedido',
        destination: '/order',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pedido',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
