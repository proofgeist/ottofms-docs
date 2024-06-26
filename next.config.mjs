/** @type {import('next').NextConfig} */
import nextra from "nextra";
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "common"],
  async redirects() {
    return [
      {
        source: "/webhooks",
        destination: "/guides/webhooks",
        permanent: true,
      },
      {
        source: "/guides/webhook-response",
        destination: "/guides/webhooks/webhook-response",
        permanent: true,
      },
      {
        source: "/concepts/concurrency",
        destination: "/concepts/deployments/concurrency",
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/apidoc",
        destination: "/apidoc/index.html",
      },
    ];
  },
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default withNextra(nextConfig);
