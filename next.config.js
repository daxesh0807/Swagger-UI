/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')("./next-intl.config.js");

const nextConfig = {};

module.exports = withNextIntl(nextConfig);