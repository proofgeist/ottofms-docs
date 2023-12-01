import Image from "next/image";

import { useTheme } from "nextra-theme-docs";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ottodeployLite from "./ottodeploy-lite.svg";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ottodeployDark from "./ottodeploy-lite.svg";

export function OttoDeployLogo({ scale = 1 }) {
	const { theme } = useTheme();
	const baseHeight = 64;
	const baseWidth = 384;
	const height = baseHeight * scale;
	const width = baseWidth * scale;

	return (
		<Image
			height={height}
			width={width}
			src={theme === "dark" ? ottodeployDark : ottodeployLite}
			alt="OttoDeploy Logo"
		/>
	);
}
