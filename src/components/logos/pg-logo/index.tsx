import Image from "next/image";

import { useTheme } from "nextra-theme-docs";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import pgLogoLite from "./pglogo-lite.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import pgLogoDark from "./pglogo-dark.svg";

export function PGLogo({ scale = 1 }) {
  const { theme } = useTheme();
  const baseHeight = 40;
  const baseWidth = 182;
  const height = baseHeight * scale;
  const width = baseWidth * scale;

  return (
    <Image
      height={height}
      width={width}
      src={theme === "dark" ? pgLogoDark : pgLogoLite}
      alt="Proof+Geist Logo"
    />
  );
}
