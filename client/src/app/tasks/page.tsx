import { Input } from "@/components/ui/input";

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
          <div className="w-72">
            <h2 className="mb-4 text-md font-medium text-gray-600 dark:text-gray-400 flex items-center">
              Backlog
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 1.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 2.
              </p>
            </div>
          </div>
          <div className="w-72">
            <h2 className="mb-4 text-md font-medium text-gray-600 dark:text-gray-400 flex items-center">
              To Do
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 1.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 2.
              </p>
            </div>
          </div>
          <div className="w-72">
            <h2 className="mb-4 text-md font-medium text-gray-600 dark:text-gray-400 flex items-center">
              In Progress
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 1.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 2.
              </p>
            </div>
          </div>
          <div className="w-72">
            <h2 className="mb-4 text-md font-medium text-gray-600 dark:text-gray-400 flex items-center">
              Completed
            </h2>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 1.
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
              <h3 className="text-sm font-semibold mb-1">Task 1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a description for task 2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
