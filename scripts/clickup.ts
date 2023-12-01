import * as qs from "qs";


export type KnownIssue = {
	name: string;
	status: string;
	statusColor: string;
	description: string;
	tags: string[];
};

export async function getOttoFmsTasks() {
	const query = {
		archived: "false",
		tags: ["known-issue"],
	};
	const query_string = qs.stringify(query);

	const list_id = "900601034602";
	const url = `https://api.clickup.com/api/v2/list/${list_id}/task?${query_string}`;
	const r = await fetch(url, {
		headers: {
			Authorization: process.env.CLICKUP_API_KEY || "",
		},
	});

	const json = await r.json();

	return json.tasks.map((task: any) => {
		return {
			name: task.name,
			status: task.status.status,
			statusColor: task.status.color,
			description: task.description,
			tags: task.tags.map((tag: any) => tag.name),
		};
	}) as KnownIssue[];
}

// make a type from
// return {
// 	name: task.name,
// 	status: task.status.status,
// 	statusColor: task.status.color,
// 	description: task.description,
// 	tags: task.tags.map((tag: any) => tag.name),
// }
