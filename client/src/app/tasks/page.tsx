import { Input } from "@/components/ui/input";

const Tasks: React.FC = () => {
  return (
    <div className="flex-1  dark:bg-gray-950">
      <div>
        <Input
          className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-800 px-4 py-2 rounded-md text-sm w-64"
          placeholder="Search tasks..."
          type="text"
        />
      </div>
    </div>
  );
};

export default Tasks;
