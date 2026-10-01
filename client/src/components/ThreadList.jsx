import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";
import ThreadItem from "./ThreadItem.jsx";
import { useState } from "react";

function ThreadList() {
    const [page, setPage] = useState(1);

    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["threads", { page }],
        queryFn: () => getThreads(page),
        placeholderData: keepPreviousData
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Failed to load threads.</p>;
    }

    return (
        <div>
            {data.threads.map((thread) => (
                <ThreadItem
                    key={thread.id}
                    thread={thread}
                />
            ))}

            <div>
                <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>
                    {" "}Page {page}{" "}
                </span>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!data.hasMore}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ThreadList;