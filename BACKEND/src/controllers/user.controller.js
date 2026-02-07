import tryCatchWrapper from "../utils/tryCatchWrapper.js";
import { getUserUrls } from "../dao/shortUrl.js";

export const getAllUserUrls = tryCatchWrapper(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { _id } = req.user;
  const urls = await getUserUrls(_id);

  res.status(200).json({
    success: true,
    message: "Success",
    urls,
  });
});
