import Link from "next/link";
import { PGLogo } from "../logos/pg-logo";

export function Footer() {
  return (
    <div className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-justify-center nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">
      <Link href="https://www.proofgeist.com">
        <div style={{ display: "flex", gap: "8px", alignContent: "baseline" }}>
          © {new Date().getFullYear()}
          <PGLogo scale={0.6} />
          All rights reserved.
        </div>
      </Link>
    </div>
  );
}
