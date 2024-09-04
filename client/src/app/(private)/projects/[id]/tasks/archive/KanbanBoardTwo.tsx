"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BoardCardTwo, BoardColumnTwo } from "./BoardColumnTwo";
import { BoardContainer } from "../BoardColumn";
import { hasDraggableData } from "../utils";

export interface Task {
  id: number;
  title: string;
  status: string | undefined;
}

export default function KanbanBoardTwo() {
  const [columns, setColumns] = useState([
    { id: 1, title: "ToDo" },
    { id: 2, title: "inProgress" },
    { id: 3, title: "Done" },
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1", status: "ToDo" },
    { id: 2, title: "Task 2", status: "inProgress" },
    { id: 3, title: "Task 3", status: "Done" },
    { id: 4, title: "Task 4", status: "ToDo" },
    { id: 5, title: "Task 5", status: "inProgress" },
    { id: 6, title: "Task 6", status: "Done" },
  ]);
  const [activeColumn, setActiveColumn] = useState<null | number>(null);
  const [activeTask, setActiveTask] = useState<null | string | number>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <BoardContainer>
        {columns.map((column) => (
          <SortableContext
            key={column.title}
            items={tasks
              .filter((task) => task.status === column.title)
              .map((task) => task.id)}
          >
            <BoardColumnTwo id={column.title}>
              <h2>{column.title}</h2>
              {tasks
                .filter((task) => task.status === column.title)
                .map((task) => (
                  <BoardCardTwo key={task.id} id={task.id}>
                    {task.title}
                  </BoardCardTwo>
                ))}
            </BoardColumnTwo>
          </SortableContext>
        ))}
      </BoardContainer>

      {/* <DragOverlay>
        {activeId ? (
          <BoardColumnTwo id={activeId}>
            {tasks.find((task) => task.id === activeId)?.title}
          </BoardColumnTwo>
        ) : null}
      </DragOverlay> */}
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    // setActiveId(event.active.id);

    console.log(event.active);

    // if (!hasDraggableData(event.active)) return;

    const data = event.active.data.current;
    console.log("data", data);

    if (data?.type === "Column") {
      setActiveColumn(data.id);

      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.id);
      console.log(activeTask);

      return;
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    console.log("onDragOver active:", active);
    console.log("onDragOver over:", over);

    // To move a task from one column to another
    if (activeId !== overId) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);

        const task = items[oldIndex];
        const columnTitle = columns.find(
          (column) => column.id === overId
        )?.title;

        if (columnTitle) {
          task.status = columnTitle;
        }

        console.log("task", task);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("active", active);
    console.log("over", over);

    const activeData = active.data.current;
    const isActiveAColumn = activeData?.type === "Column";
    const isActiveATask = activeData?.type === "Task";

    if (isActiveAColumn) {
      const oldIndex = columns.findIndex(
        (column) => column.title === active.id
      );
      const newIndex = columns.findIndex((column) => column.title === over?.id);
      setColumns((items) => arrayMove(items, oldIndex, newIndex));

      console.log(1);

      return arrayMove(columns, oldIndex, newIndex);
    } else if (isActiveATask) {
      if (active.id !== over?.id) {
        setTasks((items) => {
          const oldIndex = items.findIndex((item) => item.id === active?.id);
          const newIndex = items.findIndex((item) => item.id === over?.id);
          // const oldIndex = items.indexOf((active as any).id);
          // const newIndex = items.indexOf((over as any).id);
          // Get the task new status and console.log it
          const task = items[oldIndex];
          console.log("task", task);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }
}
