import axios from "axios";

export const getThreads = async (page) => {
  const res = await axios.get("/threads", {
    params: {
      page,
    },
  });

  return res.data;
};