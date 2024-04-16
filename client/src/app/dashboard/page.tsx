"use client";

import React, { useState } from "react";

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

import { FaSearch, FaBell } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { RiGovernmentFill } from "react-icons/ri";

type Project = {
  id: number;
  group_id: number;
  name: string;
  progress?: number;
  daysLeft?: number;
};

const Dashboard = () => {
  const groups = [
    {
      id: 1,
      name: "Client Projects",
      description: "11 Projects",
      icon: <IoIosSchool />,
    },
    {
      id: 2,
      name: "School Projects",
      description: "11 Projects",
      icon: <RiGovernmentFill />,
    },
    {
      id: 3,
      name: "Web Development",
      description: "11 Projects",
    },
    {
      id: 4,
      name: "Web Development",
      description: "11 Projects",
    },
  ];

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

  const [activeCard, setActiveCard] = useState(-1);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);

  const showProjects = (index: number) => {
    setActiveCard(index);
    setActiveProjects(
      projects.filter((project) => project.group_id === groups[index].id)
    );
  };

  return (
    <div className="pt-5 pl-10">
      <div className="header flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-semibold">Hello user</h1>
          <p className="text-base font-medium pt-3 text-[#a5b3cb]">
            Welcome back
          </p>
        </div>
        <div className="flex space-x-10 pr-10">
          <FaSearch size={25} />
          <FaBell size={25} />
        </div>
      </div>
      {/*  Groups */}
      <div className="">
        <h2 className="text-2xl font-bold pt-10">Groups</h2>
        <div className="flex space-x-4 pt-5 pr-10 overflow-x-auto hide-scrollbar  ">
          {groups.map((group, index) => (
            <Card
              key={index}
              className={`max-w-sm bg-white rounded-xl shadow-lg flex ${
                activeCard === index ? "bg-blue-500" : ""
              }`}
              onClick={() => showProjects(index)}
            >
              <div className="flex items-center space-x-4 p-6">
                {/* Icon on the left */}
                {/* <IoIosSchool className="text-4xl flex-shrink-0" /> */}

                {group.icon &&
                  React.cloneElement(group.icon, {
                    className: "text-4xl flex-shrink-0",
                  })}

                {/* Text on the right */}
                <div>
                  <CardTitle
                    className={`text-2xl font-bold ${
                      activeCard === index ? "text-[#e5e8f7]" : ""
                    }`}
                  >
                    {group.name}
                  </CardTitle>
                  <CardDescription
                    className={`text-lg font-medium" ${
                      activeCard === index ? "text-[#e5e8f7]" : ""
                    }`}
                  >
                    {group.description}
                  </CardDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="">
        <h2 className="text-2xl font-bold pt-10">Projects</h2>
        <div className="flex space-x-4 pt-5">
          {activeProjects.map((project, index) => (
            <Card
              key={index}
              className="max-w-sm  bg-white rounded-xl shadow-lg  "
            >
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
            </Card>
          ))}
        </div>
      </div>

      {/* Tasks Today */}
      <div></div>

      {/* Progress w/calendar */}
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
