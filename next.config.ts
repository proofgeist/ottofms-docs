/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/webhooks",
        destination: "/guides/webhook",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
