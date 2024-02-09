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
};

module.exports = nextConfig;
