import express from "express";

import {
  createChapter,
  getChapters,
  getChapterById,
  updateChapter,
  deleteChapter,
} from "../controllers/chapter.js";

import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express.Router();

router.post("/chapters", auth, admin, createChapter);

router.get("/chapters", auth, getChapters);

router.get("/chapters/:id", auth, getChapterById);

router.put("/chapters/:id", auth, admin, updateChapter);

router.delete("/chapters/:id", auth, admin, deleteChapter);

export default router;