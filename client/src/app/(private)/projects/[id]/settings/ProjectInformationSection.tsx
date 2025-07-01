"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Pencil, X, Check, Save } from "lucide-react";
import { ButtonIconProps } from "./page";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";
import { ComboBox } from "@/components/ui/combo-box";
import { useProjectSettingsStore } from "@/store/zustand/projectSettingsStore";
import { updateProjectDetails } from "./api/projectSettings";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ProjectInformationSectionProps {
  ButtonIcon: React.ComponentType<ButtonIconProps>;
}

const status = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "archived",
    label: "Archived",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export default function ProjectInformationSection({
  ButtonIcon,
}: ProjectInformationSectionProps) {
  const { projectSettings, setProjectSettings } = useProjectSettingsStore();
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status[0].value); // default to "active"
  const { toast } = useToast();

  const saveName = async () => {
    if (!projectSettings?.name.trim()) {
      toast({ description: "Project name cannot be empty" });
      return;
    }

    setLoading(true);
    try {
      // Change this to dynamic later
      const response = await updateProjectDetails(
        1,
        1,
        projectSettings?.name,
        null
      );
      console.log(response);
      toast({
        title: "Project name updated",
      });
    } catch (error) {
      toast({
        title: "Failed to update project name",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveStatus = async (newStatus: string) => {
    const statusToSave = newStatus ?? projectSettings?.status;
    if (!projectSettings?.name.trim()) {
      toast({ description: "Project status cannot be empty" });
      return;
    }

    setLoading(true);
    try {
      const response = await updateProjectDetails(1, 1, null, statusToSave);
      toast({ title: "Project status updated" });
    } catch (error) {
      toast({ title: "Failed to update project status" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-xl my-2 mb-7">Project Information</h1>
      <div className="flex flex-row gap-x-10">
        <div className="text-base font-semibold flex flex-row gap-4 items-end">
          <span className="space-y-2">
            <Label htmlFor="projectTitle" className="text-base font-semibold">
              Project Title
            </Label>
            <Input
              id="projectTitle"
              placeholder="Project Title"
              value={projectSettings?.name}
              disabled={loading}
              onChange={(e) =>
                setProjectSettings({
                  ...projectSettings,
                  name: e.target.value,
                })
              }
              // className={editTitle ? "" : ""}
              // disabled={!editTitle}
            />
          </span>
          <div>
            <ButtonIcon
              icon={loading ? <ReloadIcon /> : <Save />}
              onClick={() => {
                console.log("title saved...");
                saveName();
              }}
            />
          </div>
        </div>
        <div>
          <span className="space-y-2">
            <Label htmlFor="status" className="text-base font-semibold">
              Status
            </Label>
            <ComboBox
              choices={status}
              className="w-60 items-center"
              multiple={false}
              value={projectSettings?.status ?? selectedStatus}
              onChange={(value) => {
                if (typeof value === "string") {
                  setProjectSettings({
                    ...projectSettings,
                    status: value,
                  });
                  saveStatus(value);
                }
              }}
            />
          </span>
        </div>
        <div>
          <span className="space-y-2">
            <Label
              htmlFor="projectedFinish"
              className="text-base font-semibold"
            >
              Projected Finish Date
            </Label>
            <DatePickerWithRange />
          </span>
        </div>
      </div>
    </div>
  );
}
