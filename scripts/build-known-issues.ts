import { write, writeFileSync } from "fs";
import { join } from "path";
import { getOttoFMSTasks } from "./clickup";
import { config } from "dotenv";

if (!process.env.VERCEL) config();

main().then(() => console.log("done"));

async function main() {
  const ottoFMSTable = await getOttFMSKnownIssuesMD();

  const md = `

 # Known Issues
	Here are all the known issues with OttoFMS.
	
	${ottoFMSTable}
	`;

  writeFileSync(join(__dirname, "..", "src", "pages", "known-issues.mdx"), md);
}

async function getOttFMSKnownIssuesMD() {
  const data = await getOttoFMSTasks();

  const header = `
| Name   | Status | Description |
| :----- | :----: | :---- |`;

  const rows = data.map((issue) => {
    return `| ${issue.name} | ${issue.status} | ${issue.description.replaceAll(
      "\n",
      ""
    )} |`;
  });

  const md = [header, ...rows].join("\n");

  return md;
}
