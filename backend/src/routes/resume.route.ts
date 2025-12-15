// src/routes/resume.route.ts
import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import { createResume } from "../controllers/resumeController";

const router = Router();

router.post("/", verifyToken, createResume);

export default router; // 👈 THIS LINE IS REQUIRED
