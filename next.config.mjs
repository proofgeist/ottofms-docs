/** @type {import('next').NextConfig} */
import nextra from "nextra";
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "common"],
  async redirects() {
    return [];
  },
  rewrites: async () => {
    return [
      {
        source: "/apidoc",
        destination: "/apidoc/index.html",
      },
      {
        source: "/webhooks",
        destination: "/guides/webhook",
        permanent: true,
      },
    ];
  },
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default withNextra(nextConfig);
