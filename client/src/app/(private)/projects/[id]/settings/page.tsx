"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProjectInformationSection from "./ProjectInformationSection";
import { Input } from "@/components/ui/input";
import NotificationSection from "./NotificationSection";

export interface ButtonIconProps {
  icon: JSX.Element;
  onClick: () => void;
}

function ButtonIcon({ icon, onClick }: ButtonIconProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      {icon}
    </Button>
  );
}

export default function Settings() {
  return (
    <div className="flex flex-col p-4 max-h-[calc(100vh-170px)] overflow-y-auto">
      <ProjectInformationSection ButtonIcon={ButtonIcon} />
      <Separator className="my-4" />

      {/* Public or private */}

      <NotificationSection />

      <Separator className="my-4" />
      {/* Invite link */}
      <div className="flex flex-col mt-4">
        <p className="text-lg font-semibold">Invite Link</p>
        <p className="text-sm text-muted-foreground">
          Share this link with your team to invite them to the project
        </p>
        <div className="flex flex-row gap-4 items-center mt-2">
          <Input
            type="text"
            className="w-64"
            value="https://example.com/invite"
            readOnly
          />
          <Button variant="customBlue">Copy</Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Security Zone */}
      <h1 className="text-xl my-2">Changing Major Features</h1>
      <Button
        variant="outline"
        className="flex-grow my-2 border-red-500 font-semibold"
      >
        Make the Project Public?
      </Button>
      <Button
        variant="outline"
        className="flex-grow my-2 border-red-500 font-semibold"
      >
        Archive Project
      </Button>
      <Button variant="destructive" className="flex-grow my-2 font-semibold">
        Delete Project
      </Button>
    </div>
  );
}
