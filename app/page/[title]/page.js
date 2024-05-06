"use client";
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "../../../lib/index";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export default function Page({ params }) {
  const [entry, setEntry] = useState({});

  const getContent = async () => {
    const entry = await Stack.getElementByUrl("page", "/page/" + params.title);
    console.log(entry);
    setEntry(entry);
  };

  useEffect(() => {
    onEntryChange(getContent);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="mx-auto my-40 p-40 max-w-3xl text-3xl text-center border-neutral-500 border-4">

        {/* ----- CONTENT FROM CONTENTSTACK ----- */}
        {entry?.content}
      </div>
    </div>
  );
}
