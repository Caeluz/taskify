"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/projects");
  });

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
