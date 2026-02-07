import express from "express";
import { getAllUserUrls } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/urls", authMiddleware, getAllUserUrls);

export default router;