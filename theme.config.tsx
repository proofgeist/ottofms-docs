import { useRouter } from "next/router";
import { useConfig, useTheme, DocsThemeConfig } from "nextra-theme-docs";
import { Footer } from "./src/components/ui/footer";
import { OttoFMSLogo } from "@/components/logos/ottofms";
import { IconExternalLink } from "@tabler/icons-react";
import "./src/styles/globals.css";
import NoSsr from "@/components/no-ssr";
import { TopRightLogo } from "@/components/ui/top-right-logo";

const config: DocsThemeConfig = {
  primaryHue: 201,
  logo: Logo,
  darkMode: true,
  head: Head,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent: ({ title, type }) => {
      if (title === "Coming from Otto v3") {
        return (
          <span
            style={{ fontSize: "16px", fontWeight: "900", color: "#0977B1" }}
          >
            {title}
          </span>
        );
      }
      return <>{title}</>;
    },
  },
  docsRepositoryBase: "https://pr.new/proofgeist/ottofms-docs/edit/main",
  footer: { text: Footer },
  feedback: { content: null },
  editLink: {
    component: withoutServerEditLink,
  },
  useNextSeoProps() {
    return {
      titleTemplate: `%s | OttoFMS`,
    };
  },
  navbar: {
    extraContent: <TopRightLogo />,
  },
};

export default config;

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
        content={`${baseUrl}/api/og-image?title=${title}&subTitle=${
          frontMatter.subTitle || ""
        }`}
      />
      <meta
        property="twitter:title"
        content={title || "OttoFMS Documentation"}
      />
      <meta
        property="twitter:image"
        content={`${baseUrl}/api/og-image?title=${title}&subTitle=${
          frontMatter.subTitle || ""
        }`}
      />
      <meta
        property="twitter:description"
        content={frontMatter.description || "OttoFMS Documentation"}
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

function EditLink({
  filePath,
  className,
}: {
  filePath?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <a
      className={className}
      target="_blank"
      href={`https://pr.new/proofgeist/ottofms-docs/edit/main/${filePath}?initialPath=${window.location.pathname.replace(
        "/",
        ""
      )}`}
      style={{ display: "flex", gap: 6, alignItems: "center" }}
    >
      Edit This page <IconExternalLink size={18} />
    </a>
  );
}

function withoutServerEditLink({
  filePath,
  className,
}: {
  filePath?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <NoSsr>
      <EditLink filePath={filePath} className={className} />
    </NoSsr>
  );
}

function Null() {
  return <></>;
}
