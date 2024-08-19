import { KanbanBoard } from "./KanbanBoard";

export default function ShowProject({ params }: { params: { id: number } }) {
  return (
    <div className="mx-4 my-4">
      <KanbanBoard />
    </div>
  );
}
