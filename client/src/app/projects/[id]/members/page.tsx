"use client";
import { usePathname } from "next/navigation";

// export default function Members({ id }: { id: string }) {
export default function Members() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  console.log(id);
  //   return <div>{id}</div>;
}
