"use client";

import { useState } from "react";
import TerminalHeader from "@/components/TerminalHeader";
import MetricMenu from "@/components/MetricMenu";
import MetricDetail from "@/components/MetricDetail";

export default function Home() {
  const [view, setView] = useState(null); // null = menu, otherwise = metric slug

  const handleSelect = (slug) => {
    setView(slug);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };
  const handleBack = () => {
    setView(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  return (
    <main className="page">
      <TerminalHeader rightStatus={view ? "VIEWING" : "READY"} />
      <hr className="rule" />
      {view ? (
        <MetricDetail slug={view} onBack={handleBack} onSelect={handleSelect} />
      ) : (
        <MetricMenu onSelect={handleSelect} />
      )}
    </main>
  );
}
