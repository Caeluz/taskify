import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboBox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Time } from "@/components/ui/time";
import { TimePicker } from "@/components/ui/time-picker";

export default function AddTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create Task</DialogHeader>
        <Input placeholder="Task Name" />
        <Label>Assign To:</Label>
        <ComboBox
          choices={[{ label: "test", value: "test" }]}
          className="w-96"
        />
        {/* <DatePicker /> */}
        {/* <DateTimePicker /> */}
        {/* <Time /> */}
        <TimePicker />
        {/* <input type="datetime-local" /> */}
      </DialogContent>
    </Dialog>
  );
}
