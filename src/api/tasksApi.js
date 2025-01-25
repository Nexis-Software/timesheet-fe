import axiosClient from "./axiosClient";

export const getTasksSummary = (data) =>
  axiosClient.post("/api/tasks/summary", data);
