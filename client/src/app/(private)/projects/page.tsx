"use client";
import { useEffect, useState } from "react";
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
import fetchProjects from "./api/projects";
import fetchUserProjects from "./api/userProjects";
import AddProjectDialogContent from "./components/AddProjectDialogContent";
import { useUserStore } from "@/store/zustand/userStore";
import { useUserProjectsStore } from "@/store/zustand/userProject";

export interface Project {
  id: number;
  name: string;
  progress: number;
  status: string;
  description: string;
  members: number[];
}

export default function Project() {
  const [projectCount, setProjectCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  // const [userProjects, setUserProjects] = useState<Project[]>([]);

  const { setUser, user } = useUserStore();

  const { setUserProjects, userProjects } = useUserProjectsStore();

  useEffect(() => {
    fetchUserProjects(user.id).then((response) => {
      console.log(response);
      setUserProjects(response.data);
    });
  }, []);

  // console log the type of projects
  console.log(userProjects);

  console.log(user);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="p-6">6 Projects</h1>
        <Input
          placeholder="Search projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="m-5 w-96"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="m-5" variant="customBlue">
              <Plus className="mr-3 w-5 h-5" />
              <div className="text-base">Create Project</div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddProjectDialogContent userId={user.id} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-rows-3 grid-cols-4 gap-4 p-7">
        {userProjects
          .filter((userProject) => {
            return (
              searchTerm === "" ||
              userProject.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .map((userProject) => (
            <Link
              href={`/projects/${userProject.id}/overview`}
              key={userProject.id}
            >
              <Card className="hover:bg-[#3b82f6] hover:text-white">
                <CardHeader>
                  <div className="flex flex-row justify-between">
                    <CardTitle>{userProject.name}</CardTitle>
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
                            console.log(e);
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
                        <Link href={`/projects/${userProject.id}/members`}>
                          <DropdownMenuItem
                            onClick={(e) => {
                              // console.log("Team clicked");
                            }}
                          >
                            Members
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={(e) => {
                            console.log("Subscription clicked");
                          }}
                        >
                          Subscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{userProject.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-row space-x-4">
                  <Progress className="" value={userProject.progress} />
                  {/* <div className="whitespace-nowrap">
                  {project.members.length} members
                </div> */}
                </CardFooter>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
