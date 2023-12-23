import { useRouter } from "next/router";
import { useConfig, useTheme, DocsThemeConfig } from "nextra-theme-docs";
import { Footer } from "./src/components/footer";
import { OttoFMSLogo } from "@/components/logos/ottofms";
function getBaseUrl() {
  const productionUrl = "https://docs.ottofms.com";
  const localDevUrl = "http://localhost:3063";
  const devOrPreview = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : localDevUrl;
  const vercelENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const url = vercelENV === "production" ? productionUrl : devOrPreview;

  return url;
}

function Head() {
  const baseUrl = getBaseUrl();

  const { asPath, defaultLocale, locale } = useRouter();
  const { frontMatter, title } = useConfig();
  const url =
    baseUrl + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

  return (
    <>
      <meta property="og:url" content={url} />
      <meta
        property="og:description"
        content={frontMatter.description || "OttoFMS Documentation"}
      />
      <meta
        property="og:image"
        content={`${baseUrl}/api/og-image?title=${title}&subtitle=${
          frontMatter.subTitle || ""
        }`}
      />
    </>
  );
}

function Logo() {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <OttoFMSLogo scale={0.55} />
    </div>
  );
}

const config: DocsThemeConfig = {
  primaryHue: 201,
  logo: Logo,
  darkMode: true,
  head: Head,
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  docsRepositoryBase: "https://github.com/proofgeist/ottofms-docs/tree/main",
  footer: { text: Footer },
  feedback: { content: null },
  editLink: { component: Null },
  banner: {
    key: "ottofms-beta-release",
    text: (
      <a href="/beta" target="_blank">
        OttoFMS is in beta. 🛑 Do not use in production. 🛑 Read more →
      </a>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: `%s | OttoFMS`,
    };
  },
};

export default config;

function Null() {
  return <></>;
}
