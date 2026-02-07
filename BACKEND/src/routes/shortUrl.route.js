import express from "express";
import { createShortUrl, createCustomShortUrl, deleteShortUrl } from "../controllers/shortUrl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createShortUrl);
router.post("/custom/", authMiddleware, createCustomShortUrl);
router.delete("/:id", authMiddleware, deleteShortUrl);

export default router;

