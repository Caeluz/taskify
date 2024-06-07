"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Ellipsis } from "lucide-react";

import Link from "next/link";
import { set } from "date-fns";

export default function Project() {
  const [projectCount, setProjectCount] = useState(6);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="p-6">6 Projects</h1>
        <Dialog>
          <DialogTrigger>
            <Button className="m-5" variant="blue">
              <Plus className="mr-3 w-5 h-5" />
              <div className="text-base">Create Project</div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                className="w-full"
              />
              <Label htmlFor="members">Members</Label>
              <Input
                id="members"
                placeholder="Add members to project"
                className="w-full"
              />
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="Enter project description"
                className="w-full"
              />
            </div>
            <DialogFooter>
              <Button
                variant="blue"
                onClick={() => {
                  setProjectCount(projectCount + 1);
                }}
              >
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-rows-3 grid-cols-4 gap-4 p-7">
        {Array.from({ length: projectCount }).map((_, index) => (
          <Link href={`/projects/${index}/tasks`} key={index}>
            <Card className="hover:bg-[#3b82f6] hover:text-white">
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <CardTitle>Card Title</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          console.log("Edit clicked");
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setProjectCount(projectCount - 1);
                        }}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          console.log("Team clicked");
                        }}
                      >
                        Team
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          console.log("Subscription clicked");
                        }}
                      >
                        Subscription
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* <Button></Button> */}
                </div>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-row space-x-4">
                <Progress className="" value={33} />
                <div className="whitespace-nowrap">7 members</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
