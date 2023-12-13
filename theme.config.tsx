import { useRouter } from "next/router";
import { useConfig, useTheme } from "nextra-theme-docs";
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
  const { frontMatter } = useConfig();
  const url =
    baseUrl + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

  return (
    <>
      <meta property="og:url" content={url} />
      <meta
        property="og:description"
        content={frontMatter.description || "OttoFms Documentation"}
      />
    </>
  );
}

function Logo() {
  const { theme } = useTheme();
  const iconVariant = theme === "dark" ? "darkmode" : "lightmode";
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

const config = {
  primaryHue: 201,
  logo: Logo,
  darkMode: true,
  head: Head,
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  footer: { text: Footer },
  feedback: { content: null },
  editLink: { component: Null },
  banner: {
    key: "ottofms-beta-release",
    text: (
      <a href="/beta" target="_blank">
        OttoFms is in beta. 🛑 Do not use in production. 🛑 Read more →
      </a>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: `%s | OttoFms`,
    };
  },
};

export default config;

function Null() {
  return <></>;
}
