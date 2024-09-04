"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function BoardColumnTwo(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, data: { type: "Column" } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-11 border border-gray-200 rounded-lg bg-lime-900 shadow-sm mx-20 mt-2"
    >
      {props.children}
    </div>
  );
}

export function BoardContainer({ children }: any) {
  return <div className="flex flex-row">{children}</div>;
}

export function BoardCardTwo({ children, ...props }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id, data: { type: "Task" } });
  return (
    <div
      ref={setNodeRef}
      // style={style}
      {...attributes}
      {...listeners}
      className="p-4  rounded-lg shadow-sm border border-gray-200"
    >
      {children}
    </div>
  );
}
