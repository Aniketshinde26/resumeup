// src/routes/resume.route.ts
import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import { optionalToken } from "../middleware/authmiddleware";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController";
import { builderLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/", verifyToken, createResume);
router.get("/", optionalToken, getAllResumes);
router.get("/:id", optionalToken, getResumeById);
router.put("/:id", builderLimiter, verifyToken, updateResume);
router.delete("/:id", verifyToken, deleteResume);
export default router;

