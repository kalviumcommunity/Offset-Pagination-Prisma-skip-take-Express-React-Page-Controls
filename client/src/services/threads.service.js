import apiClient from "./apiClient";

export const getThreads = async (page) => {
    const res = await apiClient.get("/threads", {
        params: {
            page: page
        }
    });

    return res.data;
};