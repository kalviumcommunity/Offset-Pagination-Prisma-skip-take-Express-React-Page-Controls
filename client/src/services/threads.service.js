import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchThreads(page = 1) {
  const res = await axios.get(`${API_URL}/api/threads`, {
    params: { page },
  });

  return res.data;
}