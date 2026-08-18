import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController";
import {
  builderLimiter,
  resumeCreationLimiter,
  deleteResumeLimiter,
  getResumesLimiter,
  getSingleResumeLimiter,
} from "../middleware/rateLimiter";

const router = Router();

router.post("/", verifyToken, resumeCreationLimiter, createResume);
router.get("/", verifyToken, getResumesLimiter, getAllResumes);
router.get("/:id", verifyToken, getSingleResumeLimiter, getResumeById);
router.put("/:id", verifyToken, builderLimiter, updateResume);
router.delete("/:id", verifyToken, deleteResumeLimiter, deleteResume);
export default router;
