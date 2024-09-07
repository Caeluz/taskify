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
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";

export default function AddTaskDialogContent() {
  return (
    <>
      <DialogHeader>Create Task</DialogHeader>
      <Input placeholder="Task Name" />
      <Label>Assign To:</Label>
      <ComboBox
        choices={[{ label: "test", value: "test" }]}
        value={""}
        onChange={() => {}}
      />
      {/* <div className="flex flex-row items-center overflow-auto space-x-4 py-2">
          <Label className="whitespace-nowrap">From:</Label>
          <DatePicker dateToday={true} />
          <Label className="whitespace-nowrap">To:</Label>
          <DatePicker />
        </div> */}

      <Label>Date:</Label>
      <DatePickerWithRange dateToday={true} />

      <Label>Priority:</Label>
      <ComboBox
        choices={[
          { label: "Low", value: "LOW" },
          { label: "Medium", value: "MEDIUM" },
          { label: "High", value: "HIGH" },
        ]}
        value={""}
        onChange={() => {}}
      />
      <Label htmlFor="description">Description:</Label>
      <Textarea
        className="resize-none"
        placeholder="Type other details"
        id="description"
      />
      <Button>Submit</Button>
    </>
  );
}
