import axiosInstance from "../utils/axiosInstance.js";

export const loginUser = async ({ email, password }) => {
  const { data } = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return data;
};

export const registerUser = async ({ username, email, password }) => {
  const { data } = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
  });
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};

export const getAllUserUrls = async () => {
  const res = await axiosInstance.get("/user/urls");
  return res.data.urls; // 👈 return only array
};
