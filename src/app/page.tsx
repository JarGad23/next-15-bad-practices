"use client";

import { CharacterList } from "@/components/character-list";
import { DevToolbar } from "@/components/dev-toolbar";
import { StatusSelect } from "@/components/status-select";
import { useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("alive");
  const [page, setPage] = useState(1);
  const [loadTime, setLoadTime] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  const handleStatusChange = (newStatus: string) => {
    setPage(1);
    setStatus(newStatus);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <main className="p-4 pt-12">
      <DevToolbar loadTime={loadTime} requestCount={requestCount} />
      <h1 className="text-2xl font-bold mb-4">
        Rick and Morty Characters (Bad Practices v2)
      </h1>

      <StatusSelect status={status} onChange={handleStatusChange} />

      <CharacterList
        status={status}
        page={page}
        incrementRequestCount={() => setRequestCount((prev) => prev + 1)}
        onLoadTime={(time) => setLoadTime(time)}
      />

      <button
        onClick={handleLoadMore}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Load More
      </button>
    </main>
  );
}
