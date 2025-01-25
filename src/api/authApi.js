import axiosClient from "./axiosClient";

export const registerUser = (data) =>
  axiosClient.post("/auth/user/register", data);
export const loginUser = (data) => axiosClient.post("/auth/user/login", data);
