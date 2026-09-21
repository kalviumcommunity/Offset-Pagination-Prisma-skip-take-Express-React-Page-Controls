// client/src/components/ThreadList.jsx
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchThreads } from "../services/threads.service";
import ThreadItem from "./ThreadItem";

const PAGE_SIZE = 10;

export default function ThreadList() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["threads", { page }], // page in the key -> new fetch per page
    queryFn: () => fetchThreads(page),
    placeholderData: keepPreviousData, // v5: keeps old page visible while loading
  });

  if (isPending) return <p>Loading threads...</p>;
  if (isError) return <p>Something went wrong: {error.message}</p>;

  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  return (
    <div>
      <ul>
        {data.threads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>

        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>

        <button onClick={() => setPage((p) => p + 1)} disabled={!data.hasMore}>
          Next
        </button>
      </div>
    </div>
  );
}