import express from "express";

import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subject.js";

import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express.Router();

router.post("/", auth, admin, createSubject);

router.get("/", auth, getAllSubjects);

router.get("/:id", auth, getSubjectById);

router.put("/:id", auth, admin, updateSubject);

router.delete("/:id", auth, admin, deleteSubject);

export default router;