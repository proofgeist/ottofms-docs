import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useMemo, useState } from "react";

const placeholderImageUrl =
  "https://cdn-ottomatic.b-cdn.net/assets/ottomatic/logos/Ottomatic_Icon.png"; // Example placeholder image

function getDeployBuildUrl(manifestUrl: string) {
  return `https://console.ottomatic.cloud/deploy/build?buildUrl=${encodeURIComponent(
    manifestUrl
  )}`;
}

function getStylesString(styles: Record<string, string>) {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join(";");
}

const buttonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 15px",
  backgroundColor: "#3f847e",
  color: "white",
  textDecoration: "none",
};
const buttonStylesString = getStylesString(buttonStyles);

const imgStyles = {
  verticalAlign: "middle",
  height: "24px",
  marginRight: "8px",
  border: "none",
};
const imgStylesString = getStylesString(imgStyles);

function CopyIcon({ isCopied }: { isCopied: boolean }) {
  return isCopied ? (
    <IconCheck className="w-4 h-4" />
  ) : (
    <IconCopy className="w-4 h-4" />
  );
}

function CopyButton({
  copyValue,
  text,
  disabled,
}: {
  copyValue: string;
  text: string;
  disabled: boolean;
}) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <button
      onClick={() => {
        if (disabled) return;
        navigator.clipboard.writeText(copyValue);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }}
      className="text-gray-800 border-gray-300 border rounded-md flex items-center gap-2 px-4 py-2 bg-gray-100"
      disabled={disabled}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <CopyIcon isCopied={isCopied} />
      {isCopied ? "Copied!" : text}
    </button>
  );
}
export function DeployBuild() {
  const [manifestUrl, setManifestUrl] = useState<string>("");

  const deployTargetUrl = useMemo(() => {
    try {
      const url = new URL(manifestUrl);
      return getDeployBuildUrl(url.href);
    } catch (e) {
      return null;
    }
  }, [manifestUrl]);

  const htmlSnippet = useMemo(() => {
    const styles = buttonStylesString;
    const imgStyles = imgStylesString;

    // Ensure manifestUrl is valid before generating the snippet
    const href = getDeployBuildUrl(manifestUrl);

    return `<a href="${href}" target="_blank" style="${styles}">
  <img src="${placeholderImageUrl}" alt="Deploy Button" style="${imgStyles}" />
  Deploy Now
</a>`;
  }, [manifestUrl, placeholderImageUrl]);

  return (
    <>
      <div className="mt-4">
        <label
          htmlFor="manifestUrlInput"
          style={{ display: "block", marginBottom: "5px" }}
          className="font-medium"
        >
          Build Manifest URL:
        </label>
        <input
          id="manifestUrlInput"
          type="url"
          value={manifestUrl}
          onChange={(e) => setManifestUrl(e.target.value)}
          placeholder="Enter manifest URL"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            boxSizing: "border-box",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ justifySelf: "start" }}>
        <h3>Preview:</h3>
        {/* Render the button directly for preview */}
        <div>
          <a
            onClick={(e) => {
              if (!deployTargetUrl) {
                e.preventDefault();
              }
            }}
            href={deployTargetUrl || undefined}
            target="_blank"
            style={{
              ...buttonStyles,
              cursor: deployTargetUrl ? "pointer" : "not-allowed",
            }}
          >
            <img
              src={placeholderImageUrl}
              alt="Deploy Button"
              style={imgStyles}
            />
            Deploy Now
          </a>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <CopyButton
          copyValue={htmlSnippet}
          text="Copy HTML"
          disabled={!deployTargetUrl}
        />
        <CopyButton
          copyValue={deployTargetUrl || ""}
          text="Copy Link"
          disabled={!deployTargetUrl}
        />
      </div>
    </>
  );
}
