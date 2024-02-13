import Link from "next/link";
import { PGLogo } from "../logos/pg-logo";

export function Footer() {
  return (
    <Link href="https://www.proofgeist.com">
      <div style={{ display: "flex", gap: "8px", alignContent: "baseline" }}>
        © {new Date().getFullYear()}
        <PGLogo scale={0.6} />
        All rights reserved.
      </div>
    </Link>
  );
}
