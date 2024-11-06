"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { LucideUserPlus, Filter, ArrowDownUp } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns, Member } from "./columns";
import { fetchProjectMembers } from "./api/members";

// export default function Members({ id }: { id: string }) {
export default function Members() {
  let { id: projectId } = useParams<{ id: string }>();

  const [projectMembers, setProjectMembers] = useState([
    { name: "John Doe", position: "Back-end", completedTasks: 20 },
    { name: "Test", position: "Admin", completedTasks: 20 },
    { name: "Test 2", position: "Project Lead", completedTasks: 20 },
  ]);

  // const pathname = usePathname();
  // const projectId = pathname.split("/")[2];

  useEffect(() => {
    fetchAndSetProjectMembers(projectId);
  }, [projectId]);

  async function fetchAndSetProjectMembers(projectId: string) {
    try {
      const data = await fetchProjectMembers(projectId);
      setProjectMembers(data.data);
    } catch (error) {
      console.error("Error fetching project members:", error);
    }
  }

  console.log(projectMembers);

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        // data={[
        //   {
        //     id: "1",
        //     name: "John Doe",
        //     position: "Back-end",
        //     pendingTasks: 20,
        //     completedTasks: 20,
        //   },
        //   {
        //     id: "2",
        //     name: "Tester",
        //     position: "QA",
        //     pendingTasks: 1,
        //     completedTasks: 1,
        //   },
        // ]}
        data={projectMembers}
        variant="table"
      />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Client Project E-Commerce</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          <LucideUserPlus className="inline-block mr-2" />
          Add Member
        </button>
      </div>
      <div className="flex mt-4 space-x-4">
        <button className="bg-gray-200 px-4 py-2 rounded">
          <Filter className="inline-block mr-2" />
          Filter
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded">
          <ArrowDownUp className="inline-block mr-2" />
          Sort
        </button>
      </div>
      <div className="mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Position</th>
              <th className="py-2">Completed Tasks</th>
              <th className="py-2">Menu</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{member.name}</td>
                <td className="py-2 px-4">{member.position}</td>
                <td className="py-2 px-4">{member.completedTasks}</td>
                <td className="py-2 px-4">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
