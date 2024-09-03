"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BoardColumn, BoardContainer } from "./BoardColumn";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { type Task, TaskCard } from "./TaskCard";
import type { Column } from "./BoardColumn";
import { hasDraggableData } from "./utils";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import fetchProjectTasks, { updateTaskStatus } from "./api/tasks";

const defaultCols = [
  {
    id: 1 as const,
    // id: "ToDo" as const,
    name: "ToDo",
    title: "Todo",
  },
  {
    id: 2 as const,
    // id: "InProgress" as const,
    name: "InProgress",
    title: "In progress",
  },
  {
    id: 3 as const,
    // id: "Done" as const,
    name: "Done",
    title: "Done",
  },
  // {
  //   id: "archived" as const,
  //   title: "Archived",
  // },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];
export type ColumnName = (typeof defaultCols)[number]["name"];

const initialTasks: Task[] = [
  {
    id: "1",
    project_id: 1,
    name: "Task 1",
    description: "Description 1",
    priority: "high",
    task_status_id: 1,
    start_date: "2021-08-01",
    due_date: "2021-08-10",
    created_at: "2021-08-01",
    updated_at: "2021-08-01",
    taskStatus: {
      id: 1,
      name: "ToDo",
      hex_color: "#FF0000",
    },
  },
  {
    id: "2",
    project_id: 1,
    name: "Task 2",
    description: "Description 2",
    priority: "medium",
    task_status_id: 2,
    start_date: "2021-08-01",
    due_date: "2021-08-10",
    created_at: "2021-08-01",
    updated_at: "2021-08-01",
    taskStatus: {
      id: 2,
      name: "InProgress",
      hex_color: "#00FF00",
    },
  },
  {
    id: "3",
    project_id: 1,
    name: "Task 3",
    description: "Description 3",
    priority: "low",
    task_status_id: 3,
    start_date: "2021-08-01",
    due_date: "2021-08-10",
    created_at: "2021-08-01",
    updated_at: "2021-08-01",
    taskStatus: {
      id: 3,
      name: "done",
      hex_color: "#0000FF",
    },
  },
  {
    id: "4",
    project_id: 1,
    name: "Task 4",
    description: "Description 4",
    priority: "high",
    task_status_id: 4,
    start_date: "2021-08-01",
    due_date: "2021-08-10",
    created_at: "2021-08-01",
    updated_at: "2021-08-01",
    taskStatus: {
      id: 4,
      name: "archived",
      hex_color: "#FFFF00",
    },
  },
];

export function KanbanBoard({ params }: { params: { id: number } }) {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Call the api to get the tasks for the project
  useEffect(() => {
    fetchProjectTasks(params.id)
      .then((response) => {
        console.log(response);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: coordinateGetter,
    // })
  );

  // function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
  //   const tasksInColumn = tasks.filter((task) => task.columnId === columnId);
  //   const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
  //   const column = columns.find((col) => col.id === columnId);
  //   return {
  //     tasksInColumn,
  //     taskPosition,
  //     column,
  //   };
  // }

  // const announcements: Announcements = {
  //   onDragStart({ active }) {
  //     if (!hasDraggableData(active)) return;
  //     if (active.data.current?.type === "Column") {
  //       const startColumnIdx = columnsId.findIndex((id) => id === active.id);
  //       const startColumn = columns[startColumnIdx];
  //       return `Picked up Column ${startColumn?.title} at position: ${
  //         startColumnIdx + 1
  //       } of ${columnsId.length}`;
  //     } else if (active.data.current?.type === "Task") {
  //       pickedUpTaskColumn.current = active.data.current.task.columnId;
  //       const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
  //         active.id,
  //         pickedUpTaskColumn.current
  //       );
  //       return `Picked up Task ${
  //         active.data.current.task.content
  //       } at position: ${taskPosition + 1} of ${
  //         tasksInColumn.length
  //       } in column ${column?.title}`;
  //     }
  //   },
  //   onDragOver({ active, over }) {
  //     if (!hasDraggableData(active) || !hasDraggableData(over)) return;

  //     if (
  //       active.data.current?.type === "Column" &&
  //       over.data.current?.type === "Column"
  //     ) {
  //       const overColumnIdx = columnsId.findIndex((id) => id === over.id);
  //       return `Column ${active.data.current.column.title} was moved over ${
  //         over.data.current.column.title
  //       } at position ${overColumnIdx + 1} of ${columnsId.length}`;
  //     } else if (
  //       active.data.current?.type === "Task" &&
  //       over.data.current?.type === "Task"
  //     ) {
  //       const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
  //         over.id,
  //         over.data.current.task.columnId
  //       );
  //       if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
  //         return `Task ${
  //           active.data.current.task.content
  //         } was moved over column ${column?.title} in position ${
  //           taskPosition + 1
  //         } of ${tasksInColumn.length}`;
  //       }
  //       return `Task was moved over position ${taskPosition + 1} of ${
  //         tasksInColumn.length
  //       } in column ${column?.title}`;
  //     }
  //   },
  //   onDragEnd({ active, over }) {
  //     if (!hasDraggableData(active) || !hasDraggableData(over)) {
  //       pickedUpTaskColumn.current = null;
  //       return;
  //     }
  //     if (
  //       active.data.current?.type === "Column" &&
  //       over.data.current?.type === "Column"
  //     ) {
  //       const overColumnPosition = columnsId.findIndex((id) => id === over.id);

  //       return `Column ${
  //         active.data.current.column.title
  //       } was dropped into position ${overColumnPosition + 1} of ${
  //         columnsId.length
  //       }`;
  //     } else if (
  //       active.data.current?.type === "Task" &&
  //       over.data.current?.type === "Task"
  //     ) {
  //       const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
  //         over.id,
  //         over.data.current.task.columnId
  //       );
  //       if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
  //         return `Task was dropped into column ${column?.title} in position ${
  //           taskPosition + 1
  //         } of ${tasksInColumn.length}`;
  //       }
  //       return `Task was dropped into position ${taskPosition + 1} of ${
  //         tasksInColumn.length
  //       } in column ${column?.title}`;
  //     }
  //     pickedUpTaskColumn.current = null;
  //   },
  //   onDragCancel({ active }) {
  //     pickedUpTaskColumn.current = null;
  //     if (!hasDraggableData(active)) return;
  //     return `Dragging ${active.data.current?.type} cancelled.`;
  //   },
  // };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.taskStatus?.name === col.name)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.taskStatus.name === activeColumn.name
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    console.log("active", active);
    console.log("over", over);

    // console.log("Active ID:", activeId);
    // console.log("Over ID:", overId);

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) {
      console.log("Active ID and Over ID are the same");
      return;
    } else {
      console.log("Active ID and Over ID are different");
    }

    const isActiveAColumn = activeData?.type === "Column";
    const isActiveATask = activeData?.type === "Task";
    // if (!isActiveAColumn) return;

    // console.log("isActiveAtask", isActiveATask);

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.name === activeId
      );

      const overColumnIndex = columns.findIndex((col) => col.name === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // console.log("onDragOver active:", active);
    // console.log("onDragOver over:", over);

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    console.log(overId);

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";
    const isOverAColumn = overData?.type === "Column";

    if (!isActiveATask) return;

    // I'm dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];
        if (
          activeTask &&
          overTask &&
          activeTask.taskStatus.name !== overTask.taskStatus.name
        ) {
          activeTask.taskStatus.name = overTask.taskStatus.name;
          activeTask.taskStatus.id = overTask.taskStatus.id;
          updateTaskStatus(
            params.id,
            activeTask.id,
            activeTask.taskStatus.id
          ).catch((error) =>
            console.error("Error updating task status:", error)
          );
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];
        if (activeTask) {
          const columnId = columns.find((col) => col.name === overId)?.id;
          if (columnId) {
            activeTask.taskStatus.name = overId as ColumnName;
            activeTask.taskStatus.id = columnId;
            // updateTaskStatus(params.id, activeTask.id, columnId).catch(
            //   (error) => console.error("Error updating task status:", error)
            // );
            return arrayMove(tasks, activeIndex, activeIndex);
          }
        }
        return tasks;
      });
    }
  }
}
