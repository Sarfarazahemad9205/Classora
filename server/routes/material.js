import express from "express";

import {
  createMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} from "../controllers/material.js";

import uploadPdf from "../middlewares/upload.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express.Router();

// Create material
router.post("/", auth, admin, uploadPdf.single("file"), createMaterial);

// Get all materials
router.get("/", auth, getMaterials);

// Get material by ID
router.get("/:id", auth, getMaterialById);

// Update material
router.put("/:id", auth, admin, uploadPdf.single("file"), updateMaterial);

// Delete material
router.delete("/:id", auth, admin, deleteMaterial);

export default router;