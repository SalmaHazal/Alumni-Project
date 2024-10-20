import express from "express";
import Video from "../models/Video.js";
import {addVideo } from "../controllers/video.js";
const router = express.Router();

router.post("/", addVideo );

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).populate("provider", "firstName lastName picturePath createdAt email _id");
    res.json(videos || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

export default router;
