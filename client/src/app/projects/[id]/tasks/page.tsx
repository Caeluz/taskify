import KanbanBoard from "./kanbanBoard";

export default function ShowProject({ params }: { params: { id: number } }) {
  return (
    <div>
      <KanbanBoard params={params} />
    </div>
  );
}
