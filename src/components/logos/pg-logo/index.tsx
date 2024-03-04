import Image from "next/image";

import { useTheme } from "nextra-theme-docs";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import pgLogoLite from "./pglogo-lite.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import pgLogoDark from "./pglogo-dark.svg";
import { useEffect, useState } from "react";

export function PGLogo({ scale = 1 }) {
  const { theme: nextraTheme } = useTheme();
  const [theme, setTheme] = useState<string | undefined>(nextraTheme);
  const baseHeight = 40;
  const baseWidth = 182;
  const height = baseHeight * scale;
  const width = baseWidth * scale;

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    setTheme(html.classList.contains("dark") ? "dark" : "light");
  }, [nextraTheme]);

  return (
    <Image
      height={height}
      width={width}
      src={theme === "dark" ? pgLogoDark : pgLogoLite}
      alt="Proof+Geist Logo"
    />
  );
}
