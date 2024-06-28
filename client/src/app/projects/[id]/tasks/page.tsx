import { KanbanBoard } from "./KanbanBoard.tsx";

export default function ShowProject({ params }: { params: { id: number } }) {
  return (
    <div className="mx-4 my-4">
      <KanbanBoard />
    </div>
  );
}
