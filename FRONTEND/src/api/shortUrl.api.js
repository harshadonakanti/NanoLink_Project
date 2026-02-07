import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (longUrl) => {
  const { data } = await axiosInstance.post(
    "/create/",
    { longUrl }
  );
  return data.shortUrl; // assuming backend sends { shortUrl }
};
export const createCustomShortUrl = async (longUrl, customShortUrl) => {
  const { data } = await axiosInstance.post(
    "/create/custom/",
    { longUrl, customShortUrl }
  );
  return data.shortUrl;
};

export const deleteShortUrl = async (shortUrlId) => {
  const { data } = await axiosInstance.delete(
    `/create/${shortUrlId}`
  );
  return data;
};