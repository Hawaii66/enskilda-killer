const { withAxiom } = require("next-axiom");

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = nextConfig;
