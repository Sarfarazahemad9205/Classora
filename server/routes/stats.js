import express from "express";

import {
  recordVisit,
  getVisits,
} from "../controllers/stats.js";

import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";

const router = express.Router();

router.post("/visit", recordVisit);

router.get("/visits", auth, admin, getVisits);

export default router;