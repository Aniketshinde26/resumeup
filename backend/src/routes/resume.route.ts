import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import { validate } from "../middleware/validate";
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
import {
  createResumeSchema,
  idParamSchema,
  updateResumeSchema,
} from "../validations/resumeSchemas";

const router = Router();

router.post(
  "/",
  verifyToken,
  resumeCreationLimiter,
  validate(createResumeSchema),
  createResume,
);
router.get("/", verifyToken, getResumesLimiter, getAllResumes);
router.get("/:id", verifyToken, getSingleResumeLimiter, getResumeById);
router.put(
  "/:id",
  verifyToken,
  builderLimiter,
  validate(idParamSchema, "params"),
  validate(updateResumeSchema),
  updateResume,
);
router.delete("/:id", verifyToken, deleteResumeLimiter, deleteResume);
export default router;
