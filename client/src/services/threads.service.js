import apiClient from "./apiClient";

export async function getThreads(page = 1) {
  // Send the page number to the backend.
  const res = await apiClient.get(`/api/threads?page=${page}`);

  return res.data;
}