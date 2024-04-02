// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// Dashboard, Projects, Messages,
import { MdDashboard } from "react-icons/md";
import { BiSolidMessageRoundedDots, BiSolidFolderOpen } from "react-icons/bi";

// import logo from "@/img/logo.svg";

export default function Sidebar({
  show,
  setter,
}: {
  show: boolean;
  setter: any;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Define our base class
  const className =
    "bg-[#fcfbff] w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({
    icon,
    name,
    route,
  }: {
    icon: JSX.Element;
    name: string;
    route: string;
  }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      pathname === route ? "text-black" : "text-black/50 hover:text-black";
    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-black/10 ${colorClass}`}
      >
        <div className="text-3xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: boolean) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex">
          <Link href="/">
            {/*eslint-disable-next-line*/}
            {/* <img src={logo.src} alt="Company Logo" width={300} height={300} /> */}
          </Link>
        </div>
        <div className="flex flex-col">
          <MenuItem name="Dashboard" route="/" icon={<MdDashboard />} />
          <MenuItem
            name="Projects"
            route="/projects"
            icon={<BiSolidFolderOpen />}
          />
          <MenuItem
            name="Messages"
            route="/messages"
            icon={<BiSolidMessageRoundedDots />}
          />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
