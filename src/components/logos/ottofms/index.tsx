import Image from "next/image";

import { useTheme } from "nextra-theme-docs";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ottofmsLite from "./ottofms-lite.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ottofmsDark from "./ottofms-lite.svg";

export function OttoFmsLogo({ scale = 1 }) {
  const { theme } = useTheme();
  const baseHeight = 64;
  const baseWidth = 304;
  const height = baseHeight * scale;
  const width = baseWidth * scale;

  return (
    <Image
      height={height}
      width={width}
      src={theme === "dark" ? ottofmsDark : ottofmsLite}
      alt="OttoFms Logo"
    />
  );
}
