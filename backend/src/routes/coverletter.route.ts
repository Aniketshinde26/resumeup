import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import {
  getAllCoverLetters,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
  getCoverLetterById,
} from "../controllers/coverletterContoller";
import {
  coverLetterBuilderLimiter,
  CoverLetterCreationLimiter,
  deleteCoverLetterLimiter,
  getCoverLettersLimiter,
  getSingleCoverLetterLimiter,
} from "../middleware/rateLimiter";

const router = Router();
router.post("/", verifyToken, CoverLetterCreationLimiter, createCoverLetter);
router.get("/", verifyToken, getCoverLettersLimiter, getAllCoverLetters);
router.get(
  "/:id",
  verifyToken,
  getSingleCoverLetterLimiter,
  getCoverLetterById,
);
router.put("/:id", verifyToken, coverLetterBuilderLimiter, updateCoverLetter);
router.delete("/:id", verifyToken, deleteCoverLetterLimiter, deleteCoverLetter);
export default router;
