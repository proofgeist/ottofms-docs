import { useOs, useLocalStorage } from "@mantine/hooks";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type RaycastSnippetProps = {
  title?: string;
  snippetType?: "custom-function";
  deeplink: string;
};
export function RaycastSnippet({ snippetType, ...props }: RaycastSnippetProps) {
  const [hasExtension, setHasExtension] = useLocalStorage({
    key: "raycast-snippets",
    defaultValue: false,
  });
  const os = useOs();
  if (os !== "macos") return null;

  const deepLink_copy = props.deeplink;
  const deepLink_import = deepLink_copy.replace(
    "%22action%22%3A%22copy%22",
    "%22action%22%3A%22import%22"
  );

  return (
    <>
      <Dialog>
        <div className="bg-[#202123] p-4 rounded-lg">
          {props.title && (
            <div className="bg-gray-600 -m-4 mb-4 overflow-hidden rounded-t-lg p-2">
              <p>{props.title}</p>
            </div>
          )}
          <div className="flex  items-center gap-2">
            <img src="/raycast-snippets.png" className="max-w-[100px] mr-4" />
            <div className="flex-grow">
              <h3 className="text-lg font-bold">
                Copy this snippet using FileMaker Snippets for Raycast
              </h3>
              <div className="text-gray-400 text-sm space-y-2">
                {hasExtension ? (
                  <>
                    <p>
                      Copy the snippet directly or import it to Raycast for
                      later use.{" "}
                    </p>
                    {snippetType === "custom-function" ? (
                      <p>
                        After copying, paste directly into the{" "}
                        <b>Custom Functions Dialog</b> of your FileMaker file.
                      </p>
                    ) : null}
                    <p className="text-xs">
                      Having trouble?{" "}
                      <DialogTrigger>
                        <a className="underline">View setup guide</a>
                      </DialogTrigger>
                    </p>
                  </>
                ) : (
                  <p>
                    Raycast is a blazingly fast, totally extendable free
                    launcher for MacOS. With Raycast and the FileMaker Snippets
                    extension installed on your computer, you can copy code
                    snippets directly from these docs.
                  </p>
                )}
              </div>
            </div>
            {hasExtension ? (
              <div className="space-y-2 flex flex-col">
                <a href={deepLink_copy}>
                  <Button size="lg">Copy</Button>
                </a>
                <a href={deepLink_import} className="w-full">
                  <Button size="sm" variant="secondary" className="w-full">
                    Import
                  </Button>
                </a>
              </div>
            ) : (
              <DialogTrigger>
                <Button className="ml-4">Get Started</Button>
              </DialogTrigger>
            )}
          </div>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setup Guide</DialogTitle>
          </DialogHeader>
          s
          <div>
            <p>1. Install Raycast</p>
            <DialogDescription>
              Download & Install Raycast from{" "}
              <a
                target="_blank"
                className="underline"
                href="https://www.raycast.com/"
              >
                raycast.com
              </a>
            </DialogDescription>
          </div>
          <div>
            <p>2. Install FileMaker Snippets Extension</p>
            <DialogDescription>
              <p className="pb-2">
                Click the install button below to install the FileMaker
                Snippets, or search "FileMaker Snippets" in the Raycast store.
              </p>
              <InstallButton />
            </DialogDescription>
          </div>
          <div>
            <p>3. Click Done</p>
            <DialogDescription>
              <p className="pb-2">
                We'll save this preference in your browser so you can skip this
                dialog for future snippets.
              </p>
            </DialogDescription>
          </div>
          <div className="text-right">
            <Button onClick={() => setHasExtension(true)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <div className="bg-[#202123] p-4 rounded-md">
      <div className="bg-[#202123] p-4 rounded-lg">
        {props.title && (
          <div className="bg-gray-600 -m-4 mb-4 overflow-hidden rounded-t-lg p-2">
            <p>{props.title}</p>
          </div>
        )}
        <div className="flex justify-between items-center gap-2 ">
          <img src="/raycast-snippets.png" className="max-w-[100px] mr-4" />
          <div>
            <h3 className="text-lg font-bold">
              Copy using FileMaker Snippets for Raycast
            </h3>
            <p className="text-gray-400 text-sm">
              Raycast is a blazingly fast, totally extendable free launcher for
              MacOS. With Raycast and the FileMaker Snippets extension installed
              on your computer, you can copy code snippets directly from these
              docs.
            </p>
          </div>
          <div className="space-y-2 flex flex-col">
            <Button size="lg">Copy</Button>
            <Button size="sm" variant="secondary">
              Import
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstallButton() {
  return (
    <a
      title="Install filemaker-snippets Raycast Extension"
      href="https://www.raycast.com/eluce2/claris-snippets"
    >
      <img
        src="https://www.raycast.com/eluce2/claris-snippets/install_button@2x.png?v=1.1"
        height="64"
        alt=""
        style={{ height: "64px" }}
      />
    </a>
  );
}

export default RaycastSnippet;
