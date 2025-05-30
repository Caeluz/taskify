"use client";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
  createContext,
} from "react";
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
import fetchProjectTasks, {
  updateTaskStatus,
  updateTaskStatusAndPosition,
} from "./api/tasks";
import { fetchColumns, updateColumnPosition } from "./api/columns";

const defaultCols = [
  {
    id: 1 as const,
    // id: "ToDo" as const,
    position: 1,
    taskStatus: {
      id: 1,
      name: "toDo",
      hex_color: "#FF0000",
    },
  },
  {
    id: 2 as const,
    position: 2,
    taskStatus: {
      id: 2,
      name: "InProgress",
      hex_color: "#00FF00",
    },
  },
  {
    id: 3 as const,
    position: 3,
    taskStatus: {
      id: 3,
      name: "Done",
      hex_color: "#0000FF",
    },
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];
export type ColumnName = (typeof defaultCols)[number]["taskStatus"]["name"];

const initialTasks: Task[] = [
  {
    id: "1",
    project_id: 1,
    name: "Task 1",
    description: "Description 1",
    priority: "high",
    task_status_id: 1,
    startDate: "2021-08-01",
    dueDate: "2021-08-10",
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
    startDate: "2021-08-01",
    dueDate: "2021-08-10",
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
    startDate: "2021-08-01",
    dueDate: "2021-08-10",
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
    startDate: "2021-08-01",
    dueDate: "2021-08-10",
    created_at: "2021-08-01",
    updated_at: "2021-08-01",
    taskStatus: {
      id: 4,
      name: "archived",
      hex_color: "#FFFF00",
    },
  },
];

export const TaskContext = createContext<{
  tasks: Task[];
  // setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setTasks: (data: any) => void;
} | null>(null);

export function KanbanBoard({ params }: { params: { id: number } }) {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const columnsPosition = useMemo(
    () => columns.map((col) => col.position),
    [columns]
  );
  const columnsName = useMemo(
    () => columns.map((col) => col.taskStatus.name),
    [columns]
  );

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Define the function to fetch and set project tasks
  const fetchAndSetProjectTasks = async (projectId: number) => {
    fetchProjectTasks(projectId)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Update the useEffect to use the new function
  useEffect(() => {
    fetchAndSetProjectTasks(params.id);
  }, [params.id]);

  // useEffect for fetching columns
  useEffect(() => {
    fetchColumns(params.id)
      .then((response) => {
        setColumns(response.data);
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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <TaskContext.Provider value={{ tasks, setTasks }}>
        <BoardContainer>
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <BoardColumn
                key={col.position}
                column={col}
                tasks={tasks.filter(
                  (task) => task.taskStatus?.name === col.taskStatus.name
                )}
              />
            ))}
          </SortableContext>
        </BoardContainer>
      </TaskContext.Provider>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter(
                  (task) =>
                    task.taskStatus.name === activeColumn.taskStatus.name
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
    const overData: any = over.data.current;

    if (!hasDraggableData(active)) return;
    const activeData = active.data.current;

    // const isActiveAColumn = activeData?.type === "Column";
    const isActiveATask = activeData?.type === "Task";

    if (isActiveATask) {
      updateTaskStatusAndPosition(
        params.id,
        over.id,
        // over?.data?.current?.task?.id,
        overData.task?.taskStatus.id,
        overData.sortable?.index + 1
      ).catch((error) => console.error("Error updating task status:", error));
    }

    if (activeId === overId) {
      return;
    }

    // On drag end, update the position of column in the backend
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.taskStatus.name === activeId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.taskStatus.name === overId
      );
      updateColumnPosition(
        params.id,
        active.data.current?.column.id,
        overColumnIndex + 1
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

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
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // I'm dropping a Task over a Column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];
        if (activeTask) {
          const columnId = columns.find(
            (col) => col.taskStatus.name === overId
          )?.id;
          if (columnId) {
            activeTask.taskStatus.name = overId as ColumnName;
            activeTask.taskStatus.id = columnId;
            return arrayMove(tasks, activeIndex, activeIndex);
          }
        }
        return tasks;
      });
    }
  }
}
