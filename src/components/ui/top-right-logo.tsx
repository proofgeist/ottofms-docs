import Link from "next/link";
import { PGLogo } from "../logos/pg-logo";

export function TopRightLogo() {
  return (
    <Link
      target="_blank"
      href="https://www.proofgeist.com/products/filemaker-data-migration-tool-ottofms-superpowers/"
    >
      <div
        style={{
          display: "flex",
          alignContent: "baseline",
          paddingLeft: "12px",
        }}
      >
        <PGLogo scale={0.8} />
      </div>
    </Link>
  );
}
