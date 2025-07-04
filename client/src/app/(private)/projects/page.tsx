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
import { Plus, Ellipsis, CalendarDays } from "lucide-react";

import Link from "next/link";
import { set } from "date-fns";
import fetchProjects from "./api/projects";
import fetchUserProjects from "./api/userProjects";
import AddProjectDialogContent from "./components/AddProjectDialogContent";
import { useUserStore } from "@/store/zustand/userStore";
import { useUserProjectsStore } from "@/store/zustand/userProject";
import DeleteProjectDialogContent from "./components/DeleteProjectDialogContent";

export interface Project {
  id: number;
  user_id: number | string;
  name: string;
  progress: number;
  status: string;
  description: string;
  estimated_finish_date: string;
  members: number[];
}

export default function Project() {
  const [projectCount, setProjectCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [userProjects, setUserProjects] = useState<Project[]>([]);

  const { setUser, user } = useUserStore();

  const { setUserProjects, userProjects } = useUserProjectsStore();

  useEffect(() => {
    fetchUserProjects(user.id).then((response: any) => {
      setUserProjects(response.data);
    });
  }, []);

  // console log the type of projects
  console.log(userProjects);

  console.log(user);

  const statusColors: Record<string, string> = {
    active: "bg-green-500",
    archived: "bg-orange-400",
    completed: "bg-blue-600",
  };

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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {/* <Dialog> */}
          <DialogTrigger asChild>
            <Button className="m-5" variant="customBlue">
              <Plus className="mr-3 w-5 h-5" />
              <div className="text-base">Create Project</div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddProjectDialogContent
              userId={user.id}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
            />
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
          .map((userProject) => {
            const statusColor = statusColors[userProject.status];
            return (
              <Dialog key={userProject.id}>
                <Link
                  href={`/projects/${userProject.id}/overview`}
                  // key={userProject.id}
                >
                  <Card className="hover:bg-[#3b82f6] hover:text-white">
                    <CardHeader>
                      <div className="flex flex-row justify-between">
                        <CardTitle>{userProject.name}</CardTitle>

                        <DropdownMenu>
                          <DropdownMenuTrigger
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
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
                            <DialogTrigger
                              asChild
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="text-red-600"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <Link href={`/projects/${userProject.id}/members`}>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  // console.log("Team clicked");
                                }}
                              >
                                Members
                              </DropdownMenuItem>
                            </Link>
                            <DialogTrigger>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  console.log("Subscription clicked");
                                }}
                              >
                                Subscription
                              </DropdownMenuItem>
                            </DialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* DialogContent */}
                      </div>
                      <CardDescription>
                        {userProject.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Progress className="" value={userProject.progress} />
                    </CardContent>
                    <CardFooter className="flex flex-row items-center justify-between">
                      <div className="flex flex-row items-center space-x-3">
                        <span>{userProject.status}</span>

                        {/* Show status color dot dynamically */}
                        {statusColor && (
                          <div
                            className={`rounded-full w-3 h-3 mr-2 ${statusColor}`}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm text-muted-foreground">
                        <CalendarDays className="w-4 h-4 text-blue-500" />
                        {userProject.estimated_finish_date}
                      </div>
                      {/* <div className="whitespace-nowrap">
                      {userProj.members.length} members
                    </div> */}
                    </CardFooter>
                  </Card>
                </Link>
                {/* DialogContent -  I put the dialog content outside link, so that when the dialog got clicked, it won't go to the link*/}
                <DeleteProjectDialogContent
                  userId={userProject.user_id}
                  projectId={userProject.id}
                />
              </Dialog>
            );
          })}
      </div>
    </div>
  );
}
