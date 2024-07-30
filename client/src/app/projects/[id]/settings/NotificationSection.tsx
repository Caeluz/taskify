import { Switch } from "@/components/ui/switch";
import AddTaskDialog from "../tasks/AddTaskDialog";

export default function NotificationSection() {
  return (
    <div>
      <h1 className="text-xl my-2 mb-7">Notifications</h1>
      <div className="flex flex-row gap-4 items-center">
        <p className="text-lg font-semibold">Notify for this Project?</p>
        <Switch id="" />
      </div>
      {/* <AddTaskDialog /> */}
    </div>
  );
}
