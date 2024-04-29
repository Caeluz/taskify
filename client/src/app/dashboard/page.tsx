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

import { FaSearch, FaBell } from "react-icons/fa";

export interface Tasks {
  id: number;
  name: string;
  date: string;
  status: string;
};

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
  ];

  const tasks: Tasks[] = [
    {
      id: 1,
      name: "Create a design layout for the landing page",
      date: "2024-3-10",
      status: "pending",
    },
    {
      id: 2,
      name: "Testing the layout for the landing page",
      date: "2024-3-10",
      status: "pending",
    },
  ];

  return (
    <div className=" w-full">
      <div className="flex h-screen w-full">
        {/* left */}
        <div className="flex-grow pt-5">
          {/* Header */}
          <div className="header flex justify-between items-center ml-5">
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
            <h2 className="text-2xl font-bold">Projects</h2>
            <div className="flex space-x-4 pt-5">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <Card
                    key={index}
                    className="max-w-sm  bg-white rounded-xl shadow-lg"
                  >
                    {/* <Link href={"/test"}> */}
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium"></CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Progress className="" value={33} />
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
          </div>

          {/* Tasks Today */}
          <div className="pt-10 pr-10">
            <h2 className="text-2xl font-bold">Tasks Today</h2>
            <div className="pt-5 flex flex-col w-3/3">
              {tasks.map((task, index) => (
                <Card
                  key={index}
                  className="max-w-25 bg-white rounded-xl shadow-lg m-2"
                >
                  <div className="flex items-center space-x-4 p-6">
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        {task.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium">
                        {task.date}
                      </CardDescription>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Side Progress w/calendar */}
        {/* right */}
        {/* <div className="flex-shrink pl-15 border border-gray">
          <div className="pr-20">
            <Calendar className=" rounded-md-border shadow" />
          </div>
        </div> */}
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
