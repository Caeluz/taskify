import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Project = {
  project_id: number;
  tasks: {
    [status: string]: Task[];
  };
};

type Task = {
  id: number;
  project_id: number;
  task: string;
  priority: "low" | "medium" | "high";
  status: string;
};

const project: Project = {
  project_id: 1,
  tasks: {
    "to do": [
      {
        id: 1,
        project_id: 1,
        task: "Website Revamp",
        priority: "low",
        status: "to do",
      },
      {
        id: 2,
        project_id: 1,
        task: "SEO Optimization",
        priority: "high",
        status: "to do",
      },
    ],
    "in progress": [
      {
        id: 3,
        project_id: 1,
        task: "Content Creation",
        priority: "medium",
        status: "in progress",
      },
    ],
    done: [
      {
        id: 4,
        project_id: 1,
        task: "Mobile Optimization",
        priority: "low",
        status: "done",
      },
    ],
    others: [
      {
        id: 5,
        project_id: 1,
        task: "Others Task 1",
        priority: "low",
        status: "others",
      },
      {
        id: 6,
        project_id: 1,
        task: "Others Task 2",
        priority: "medium",
        status: "others",
      },
    ],
  },
};

const Tasks: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50  dark:bg-gray-950">
      <div className="h-[60px] flex items-center px-4">
        <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50 flex items-center">
          Web Task
        </h1>
      </div>
      <div className="flex-1 overflow-auto py-4 px-4 bg-gray-100">
        <div className="flex space-x-4">
          {Object.entries(project.tasks).map(([status, tasks]) => (
            <div className="w-72" key={status}>
              <h2 className="mb-4 text-md font-medium text-gray-600 dark:text-gray-400 flex items-center">
                {status}
              </h2>
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className="bg-white rounded-lg shadow-sm mb-4"
                >
                  <CardHeader>
                    {/* <CardTitle>Test</CardTitle> */}
                    <CardTitle className="text-sm font-semibold mb-1">
                      {task.task}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="text-sm text-gray-600 dark:text-gray-400">
                    <Badge> {task.priority}</Badge>
                  </CardFooter>
                  {/* <p>Status: {task.status}</p> */}
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
