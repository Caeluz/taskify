"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { BoardColumn, BoardContainer } from "./BoardColumn";

export default function KanbanBoard({ params }: { params: { id: number } }) {
  const [columnCount, setColumnCount] = useState(3);
  const router = useRouter();
  // const { id, tab } = params;
  const { id } = params;
  return (
    // <div className="p-6 flex gap-4 h-[calc(100vh-168px)] overflow-hidden">
    //   {Array.from({ length: columnCount }).map((_, i) => (
    //   ))}
    // </div>
    <BoardContainer>
      <BoardColumn />
    </BoardContainer>
  );
}
