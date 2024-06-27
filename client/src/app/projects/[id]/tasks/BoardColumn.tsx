"use client";
import React, { useState } from "react";

import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { cva } from "class-variance-authority";

import { ComboBox } from "@/components/ui/combo-box";
import AddTaskDialog from "./AddTaskDialog";
import TaskCard from "./TaskCard";

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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVertical } from "lucide-react";

export function BoardColumn({ key }: { key?: number }) {
  const [columnCount, setColumnCount] = useState(3);

  const isOverlay = undefined;
  const isDragging = true;

  const variants = cva(
    "h-[500px] max-h-[500px] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  return (
    // <Card className="p-6 flex gap-4 h-[calc(100vh-168px)] overflow-hidden">
    //   <div
    //     className="border rounded-lg p-6 min-w-80 w-80 h-full overflow-hidden"
    //     key={key}
    //   >
    //     {/* Header */}
    //     <div className="flex flex-row justify-between items-center">
    //       <div className="text-lg py-2">PENDING (2)</div>
    //       <div className="flex">
    //         {/* Add Task/s */}
    //         <AddTaskDialog />
    //         <DropdownMenu>
    //           <DropdownMenuTrigger>
    //             <EllipsisVertical />
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent>
    //             <DropdownMenuLabel>Functions</DropdownMenuLabel>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuGroup>
    //               <DropdownMenuItem
    //                 className="text-red-600"
    //                 //   onClick={() => {
    //                 //     setColumnCount(columnCount - 1);
    //                 //   }}
    //               >
    //                 Delete
    //               </DropdownMenuItem>
    //             </DropdownMenuGroup>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </div>
    //     </div>
    //     <Separator className="bg-[#C4C4C4]" />
    //     {/* Content */}
    //     <ScrollArea className="py-4 h-full">
    //       {Array.from({ length: 5 }).map((_, i) => (
    //         <Dialog key={i}>
    //           <DialogTrigger>
    //             <TaskCard />
    //           </DialogTrigger>
    //           <DialogContent>
    //             <DialogHeader>
    //               <DialogTitle>Creating Index Products Endpoint</DialogTitle>
    //               <DialogDescription>
    //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed
    //                 do eiusmod tempor incididunt ut labore et dolore magna
    //                 aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    //                 ullamco laboris nisi ut aliquip ex ea commodo
    //               </DialogDescription>
    //             </DialogHeader>
    //             <div>
    //               <div>
    //                 {/* Members */}
    //                 {/* <div className="mb-2">Members</div>
    //                   <div className="grid grid-cols-3 ">
    //                     <div className="flex flex-row">
    //                       <Avatar className="whitespace-nowrap w-6 h-6">
    //                         <AvatarImage
    //                           src="https://github.com/shadcn.png"
    //                           alt="@shadcn"
    //                         />
    //                         <AvatarFallback>A</AvatarFallback>
    //                       </Avatar>
    //                       <div className="text-sm">- test@gmail.com</div>
    //                     </div>
    //                   </div> */}
    //                 <div>Due Date: </div>

    //                 <Badge>10 days left...</Badge>
    //               </div>
    //             </div>
    //           </DialogContent>
    //         </Dialog>
    //       ))}
    //     </ScrollArea>
    //   </div>
    // </Card>
    <Card
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
        PENDING (2)
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Dialog key={i}>
              <DialogTrigger>
                <TaskCard />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Creating Index Products Endpoint</DialogTitle>
                  <DialogDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <div>
                    {/* Members */}
                    {/* <div className="mb-2">Members</div>
                      <div className="grid grid-cols-3 ">
                        <div className="flex flex-row">
                          <Avatar className="whitespace-nowrap w-6 h-6">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">- test@gmail.com</div>
                        </div>
                      </div> */}
                    <div>Due Date: </div>

                    <Badge>10 days left...</Badge>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-left pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      {/* Original */}
      {/* <div className="p-6 flex gap-4 h-[calc(100vh-168px)] overflow-hidden"> */}
      {/* {children} */}
      {/* </div> */}

      <div className="flex gap-4 items-center flex-row justify-left">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
