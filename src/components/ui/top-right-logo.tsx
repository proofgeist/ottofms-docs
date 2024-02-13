import Link from "next/link";
import { PGLogo } from "../logos/pg-logo";

export function TopRightLogo() {
  return (
    <Link href="https://www.proofgeist.com/products/filemaker-data-migration-tool-ottofms-superpowers/">
      <div
        style={{
          display: "flex",
          alignContent: "baseline",
          paddingLeft: "16px",
        }}
      >
        <PGLogo scale={0.8} />
      </div>
    </Link>
  );
}
