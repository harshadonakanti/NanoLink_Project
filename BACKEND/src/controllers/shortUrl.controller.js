import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/shortUrl.service.js";
import urlSchema from "../models/shortUrl.model.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const createShortUrl = tryCatchWrapper(async (req, res) => {
  const { longUrl, customShortUrl } = req.body; // ✅ FIX
  let shortUrl;

  if (!longUrl) {
    return res.status(400).json({
      message: "longUrl is required",
    });
  }

  if (req.user) {
    shortUrl = await createShortUrlWithUser(
      longUrl,
      req.user._id,
      customShortUrl || null
    );
  } else {
    shortUrl = await createShortUrlWithoutUser(longUrl);
  }

  res.status(201).json({
    shortUrl: process.env.APP_URL + shortUrl,
  });
});



export const redirectFromShortUrl = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const url = await urlSchema.findOneAndUpdate(
    { shortUrl: id },
    { $inc: { clicks: 1 } },
  );
  if (url) res.redirect(url.fullUrl);
  else {
    res.status(404).send("Not found");
  }
});

export const createCustomShortUrl = tryCatchWrapper(async (req, res) => {
  const { longUrl, customShortUrl } = req.body;
  if (!longUrl || !customShortUrl) {
    return res.status(400).json({
      message: "longUrl and customShortUrl are required",
    });
  }
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const shortUrl = await createShortUrlWithUser(longUrl, req.user._id, customShortUrl);
  res.status(201).json({
    shortUrl: process.env.APP_URL + shortUrl,
  });
});
export const deleteShortUrl = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const url = await urlSchema.findById(id);
  
  if (!url) {
    return res.status(404).json({ message: "URL not found" });
  }

  // Check if the URL belongs to the user
  if (url.user && url.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await urlSchema.findByIdAndDelete(id);
  
  res.status(200).json({
    success: true,
    message: "URL deleted successfully",
  });
});