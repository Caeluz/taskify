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
      </DialogContent>
    </Dialog>
  );
}
