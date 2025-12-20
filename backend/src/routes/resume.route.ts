// src/routes/resume.route.ts
import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController";

const router = Router();

router.post("/", verifyToken, createResume);
router.get("/", verifyToken, getAllResumes);
router.get("/:id", verifyToken, getResumeById);
router.put("/:id", verifyToken, updateResume);
router.delete("/:id", verifyToken, deleteResume);
export default router;
