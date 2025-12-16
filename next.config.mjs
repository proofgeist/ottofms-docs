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
      {
        source: "/concepts/schedules",
        destination: "/concepts/deployments/schedules",
        permanent: true,
      },
      {
        source: "/concepts/public-builds",
        destination: "/concepts/builds/public-builds",
        permanent: true,
      },
      {
        source: "/api-proxy",
        destination: "/ottofms-features/api-proxy",
        permanent: true,
      },
      {
        source: "/ottofms-console/file-manager",
        destination: "/ottofms-console/file-browser",
        permanent: true,
      },
      {
        source: "/concepts/deployments/post-deployment-scripts",
        destination: "/concepts/deployments/deployment-scripts",
        permanent: true,
      },
      {
        source: "/guides/notifications",
        destination:
          "/ottodeploy-features/deployments/advanced-options#slack-notifications",
        permanent: true,
      },
      {
        source: "/otto-console/mcp-tools",
        destination: "/otto-console/mcp-servers",
        permanent: false,
      },
      {
        source: "/:path*",
        destination: "https://docs.ottomatic.cloud/ottofms-redirect/:path*",
        permanent: true,
      }
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/apidoc",
        destination: "/apidoc/index.html",
      },
      {
        source: "/downloads/:path*",
        destination: "https://console.ottomatic.cloud/downloads/:path*",
      }
    ];
  },
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

export default withNextra(nextConfig);
