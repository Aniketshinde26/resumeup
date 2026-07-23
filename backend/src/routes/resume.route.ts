  // src/routes/resume.route.ts
import { Router } from "express";
import {verifyToken, optionalToken } from "../middleware/authmiddleware";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController";
import { builderLimiter, resumeCreationLimiter, deleteResumeLimiter, getResumesLimiter, getSingleResumeLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/", verifyToken, resumeCreationLimiter, createResume);
router.get("/", optionalToken,getResumesLimiter, getAllResumes);
router.get("/:id", optionalToken,getSingleResumeLimiter, getResumeById);
router.put("/:id", verifyToken,builderLimiter, updateResume);
router.delete("/:id", verifyToken, deleteResumeLimiter, deleteResume);
export default router;

