"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Users,
  ClipboardList,
  CirclePlus,
  MessageSquareMore,
  Paperclip,
  EllipsisVertical,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { truncateText } from "@/components/utility/truncate-text";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ShowProject({ params }: { params: { id: number } }) {
  const [columnCount, setColumnCount] = useState(3);
  const router = useRouter();
  // const { id, tab } = params;
  const { id } = params;

  return (
    <div>
      <div className="p-6 flex gap-4 h-[calc(100vh-168px)] overflow-hidden">
        {Array.from({ length: columnCount }).map((_, i) => (
          <div
            className="border rounded-lg border-[#D9D9D9] p-6 min-w-80 w-80 h-full overflow-hidden"
            key={i}
          >
            {/* Header */}
            <div className="flex flex-row justify-between items-center">
              <div className="text-lg py-2">PENDING (2)</div>
              {/* Add Task/s */}
              <div className="flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link">
                      <CirclePlus />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Add Task</DialogHeader>
                    <Input placeholder="Task Name" />
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Functions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setColumnCount(columnCount - 1);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Separator className="bg-[#C4C4C4]" />
            {/* Content */}
            <ScrollArea className="py-4 h-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <Dialog key={i}>
                  <DialogTrigger>
                    <Card className="mb-4">
                      <CardHeader className="p-5 space-y-0">
                        <div className="flex justify-left">
                          <Badge
                            className=" text-black  rounded-xl justify-center flex mb-4 text-xs "
                            variant="green"
                          >
                            LOW
                          </Badge>
                        </div>
                        <CardTitle className="mb-0 text-left">
                          Creating Index Products Endpoint
                        </CardTitle>
                        <CardDescription className="hidden">
                          {truncateText(
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                            10
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm hidden">
                        May 23, 2024 - May 30, 2024
                      </CardContent>
                      <CardFooter className="flex flex-row justify-between p-3">
                        {/* <div className="whitespace-nowrap">test</div> */}
                        <div className="flex flex-row space-x-2">
                          <MessageSquareMore />
                          <Paperclip />
                        </div>

                        <div className="flex flex-row space-x-[-12px] ">
                          <Avatar className="whitespace-nowrap w-7 h-7">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <Avatar className="whitespace-nowrap w-7 h-7">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <Avatar className="whitespace-nowrap w-7 h-7">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                        </div>
                      </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>...</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
}
