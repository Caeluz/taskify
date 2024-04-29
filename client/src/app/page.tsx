"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // router.push("/dashboard");
  });

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
