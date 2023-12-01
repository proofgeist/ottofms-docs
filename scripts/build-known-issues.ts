import { write, writeFileSync } from "fs";
import { join } from "path";
import { getOttoFmsTasks } from "./clickup";
import { config } from "dotenv";

if (!process.env.VERCEL) config();

main().then(() => console.log("done"));

async function main() {
	const ottofmstable = await getOttFMSKNownIssuesMD();

	const md = `

 # Known Issues
	Here are all the known issues with OttoFms.
	
	${ottofmstable}
	`;

	writeFileSync(join(__dirname, "..", "src", "pages", "known-issues.mdx"), md);
}

async function getOttFMSKNownIssuesMD() {
	const data = await getOttoFmsTasks();

	const header = `
| name   | status | description |
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
