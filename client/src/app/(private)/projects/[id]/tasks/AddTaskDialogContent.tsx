"use client";

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

import { useState } from "react";

import { TaskStatus } from "./TaskCard";

export default function AddTaskDialogContent({
  taskStatus,
}: {
  taskStatus: TaskStatus;
}) {
  const [selectedValue, setSelectedValue] = useState<any>(
    String(taskStatus.id)
  );
  return (
    <>
      <DialogHeader>Create Task</DialogHeader>
      <Input placeholder="Task Name" />

      <Label>Status:</Label>
      <ComboBox
        choices={[
          { label: "ToDo", value: "1" },
          { label: "In Progress", value: "2" },
          { label: "Done", value: "3" },
          { label: "Archived", value: "4" },
        ]}
        value={selectedValue}
        onChange={setSelectedValue}
      />
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
