import { PGLogo } from "./logos/pg-logo";

export function Footer() {
	return (
		<div style={{ display: "flex", gap: "8px", alignContent: "baseline" }}>
			© {new Date().getFullYear()}
			<PGLogo scale={0.6} />
			All rights reserved.
		</div>
	);
}
