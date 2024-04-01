"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Person {
  id: number;
  name: string;
}

export default function Home() {
  const [message, setMessage] = useState("Loading...");
  const [people, setPeople] = useState<Person[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setPeople(data.people);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <div>{message}</div>
      {/* <ul>
        {people.map((person) => (
          <li key={person.id}>
            <Link href={`/person/${person.id}`}>
              <a>{person.name}</a>
            </Link>
          </li>
        ))}
      </ul> */}
      {people.map((person) => (
        <li key={person.id}>
          <Link href={`/person/${person.id}`}>{person.name}</Link>
        </li>
      ))}
    </div>
  );
}
