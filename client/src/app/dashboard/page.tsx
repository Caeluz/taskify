"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";

import { FaSearch, FaBell } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";

export interface Tasks {
  id: number;
  project?: string;
  name: string;
  date: string;
  status: string;
  priority: string;
}

const Dashboard = () => {
  const projects = [
    {
      id: 1,
      group_id: 1,
      name: "Website Landing Page",
      //   description: "11",
      progress: 50,
      daysLeft: 5,
    },
    {
      id: 2,
      group_id: 1,
      name: "CRUD Application",
      daysLeft: 5,
      //   description: "11 Projects",
    },
    {
      id: 3,
      group_id: 1,
      name: "Mobile Application",
      daysLeft: 5,
      //   description: "11 Projects",
    },
  ];

  const tasks: Tasks[] = [
    {
      id: 1,
      project: "Website Landing Page",
      name: "Design layout for the landing page",
      date: "2024-3-10",
      status: "ongoing",
      priority: "low",
    },
    {
      id: 2,
      project: "Website Landing Page",
      name: "Layout for the landing page",
      date: "2024-3-10",
      status: "pending",
      priority: "high",
    },
  ];

  return (
    // Main wrapper
    <div className=" flex h-screen w-screen overflow-y-scroll overflow-x-hidden lg:w-full md:lg-full ">
      {/* left */}
      <div className="flex-grow pt-5 ml-5 w-full">
        {/* Header */}
        <div className="header flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-semibold">Hello user</h1>
            <p className="text-base font-medium pt-3 text-[#a5b3cb]">
              Welcome back
            </p>
          </div>
          <div className="flex space-x-10 mr-10">
            <FaSearch size={25} />
            <FaBell size={25} />
          </div>
        </div>

        {/* Projects */}
        <div className="pt-10">
          <h2 className="text-xl font-bold">Projects</h2>
          <ScrollArea className="w-80 whitespace-normal sm:w-10/12 md:w-2/3 lg:w-1/2 xl:w-2/3 rounded-md ">
            <div className="flex space-x-4 pt-5">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <Card
                    key={index}
                    className="w-52 h-60 bg-white rounded-xl shadow-lg flex flex-col justify-between"
                  >
                    {/* <Link href={"/test"}> */}
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium"></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-row justify-between mb-1">
                        <p className="text-sm font-medium">Progress</p>
                        <p className="text-sm font-medium">50%</p>
                      </div>
                      <Progress className="" value={50} />
                    </CardContent>
                    <CardFooter>
                      <Badge className="bg-[#eff1f6] text-[#b2bac7]">
                        {project.daysLeft} days left
                      </Badge>
                    </CardFooter>
                    {/* </Link> */}
                  </Card>
                ))
              ) : (
                <p className="text-2xl">No projects left...</p>
              )}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>

        {/* Tasks Today */}
        <div className="pt-10 pr-10">
          <h2 className="text-xl font-bold">My Tasks Today</h2>
          <div className="pt-2 flex flex-col w-3/3">
            {tasks.map((task, index) => (
              <Card
                key={index}
                className="bg-white rounded-xl shadow-lg m-2 flex w-96"
              >
                <div className="flex flex-col flex-grow p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gray-200 text-gray-600">
                        {task.project}
                      </Badge>
                      <Badge
                        className={`${
                          task.priority === "high"
                            ? "bg-red-600 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {task.priority}
                      </Badge>
                      <Badge className="bg-gray-200 text-gray-600">
                        {task.status}
                      </Badge>
                    </div>
                    <MdNavigateNext className="text-gray-400 text-xl" />
                  </div>
                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">{task.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {/* {task.date} */}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Side Progress w/calendar */}
      {/* right */}
      <div className="flex-shrink pl-15 border border-gray  ">
        <div className="pr-20">
          <Calendar className=" rounded-md-border shadow" />
        </div>
      </div>
    </div>

    // <div>
    //   <h2 className="text-2xl font-bold">Statistics</h2>
    //   <Card>
    //     <CardHeader>
    //       <CardTitle className="text-2xl font-bold">Product Design</CardTitle>
    //       <CardDescription className="text-lg font-medium">
    //         11 Projects
    //       </CardDescription>
    //     </CardHeader>
    //   </Card>

    //   <h2>Projects</h2>
    //   <Card>{/* Projects content */}</Card>

    //   <h2>Tasks Today</h2>
    //   <Card>{/* Tasks Today content */}</Card>
    // </div>
  );
};

export default Dashboard;
