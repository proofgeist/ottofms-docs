import * as qs from "qs";

export type KnownIssue = {
  name: string;
  status: string;
  statusColor: string;
  description: string;
  tags: string[];
};

async function fetchTasksFromClickup(listId: string) {
  const query = {
    archived: "false",
    tags: ["known-issue"],
  };
  const query_string = qs.stringify(query);

  const url = `https://api.clickup.com/api/v2/list/${listId}/task?${query_string}`;
  const r = await fetch(url, {
    headers: {
      Authorization: process.env.CLICKUP_API_KEY || "",
    },
  });

  return await r.json();
}

export async function getOttoFMSTasks() {
  //fetch from active dev list

  const active_list_id = "900601034602";
  const activeTasks = await fetchTasksFromClickup(active_list_id);

  //fetch from backlog list
  const backlog_list_id = "901400949003";
  const backlogTasks = await fetchTasksFromClickup(backlog_list_id);

  const tasks = [
    ...activeTasks.tasks,
    ...backlogTasks.tasks.map((val: any) => ({
      ...val,
      status: { status: "backlog" },
    })),
  ];

  return tasks.map((task: any) => {
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
