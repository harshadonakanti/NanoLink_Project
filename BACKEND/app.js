import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from 'path';
import mongoose from "mongoose";
import shortUrl from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errHandler } from "./src/utils/errHandler.js";
import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json()); /// Used to read JSON data sent from frontend or APIs
app.use(express.urlencoded({ extended: true })); // Used to read data sent from HTML forms
app.use(express.static(path.join(__dirname,"./public")))
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://simpleurl.netlify.app"
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(attachUser);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/create", shortUrl);
app.get("/:id", redirectFromShortUrl);
app.use(errHandler);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongoDb is Connected!"));


  app.get("*name", (req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
  })
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});