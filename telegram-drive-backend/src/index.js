import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { startBot } from "./utils/telegramBot.js";
import { PORT } from "./config/env.js";
import { connectDB } from "./config/db.js";
import searchRoutes from "./routes/search.js";

dotenv.config();
console.log("TEST ENV =>", process.env.BOT_TOKEN);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", searchRoutes);

app.get("/", (req, res) => {
  res.send("Telegram Drive Backend is running");
});

connectDB();
// const PORT= process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  startBot();
});
