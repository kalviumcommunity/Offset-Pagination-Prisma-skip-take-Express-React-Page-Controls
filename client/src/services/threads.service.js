import apiClient from "./apiClient.js";

export async function getThreads(page) {
  const res = await apiClient.get("/api/threads", {
    params: { page },
  });

  return res.data;
}