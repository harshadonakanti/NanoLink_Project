import { generateNanoId } from "../utils/helper.js";
import mongoose from "mongoose";
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";


export const createShortUrlWithoutUser = async (fullUrl, customShortUrl = null) => {
  const shortUrl = customShortUrl || generateNanoId(7);
  if(!shortUrl){
    throw new Error("Failed to generate short URL");
  }
  await saveShortUrl(fullUrl, shortUrl, null);
  return shortUrl;
};

export const createShortUrlWithUser = async (fullUrl,userId,customShortUrl=null) => {
  const shortUrl =customShortUrl || generateNanoId(7);
  if (customShortUrl) {
  const exists = await getCustomShortUrl(customShortUrl);
  if (exists) {
    throw new Error("Custom short URL already exists");
  }
}
  await saveShortUrl(fullUrl, shortUrl,userId);
  return shortUrl;
};