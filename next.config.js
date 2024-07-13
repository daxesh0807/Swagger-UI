/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./next-intl.config.js");

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
