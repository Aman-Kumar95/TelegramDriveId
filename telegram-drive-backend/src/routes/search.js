import express from "express";
import Media from "../models/Media.js";

const router = express.Router();

router.get("/search", async (requestAnimationFrame, res) => {
  try {
    const query = requestAnimationFrame.query.q;

    if (!query) {
      return res.status(400).json({ message: "Search query is missing" });
    }

    const results = await Media.find({
      metadata: { $regex: query, $options: "i" },
    }).sort({ uploadedAt: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
