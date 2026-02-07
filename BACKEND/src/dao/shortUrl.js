import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errHandler.js";

export const saveShortUrl = async (fullUrl, shortUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      fullUrl: fullUrl,
      shortUrl: shortUrl,
    });
    if(userId) newUrl.user = userId;
    await newUrl.save();
  } catch (error) {
    if(error.code === 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(error);
  }
};

export const getCustomShortUrl = async (customShortUrl) => {
  const url = await urlSchema.findOne({ shortUrl: customShortUrl });
  return url;
};

export const getUserUrls = async (userId) => {
  const urls = await urlSchema.find({ user: userId });
  return urls;
};