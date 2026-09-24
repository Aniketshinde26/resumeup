import { Router } from "express";
import { validate } from "../middleware/validate";
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
import {
  createCoverLetterSchema,
  idParamSchema,
  updateCoverLetterSchema,
} from "../validations/coverletterSchemas";

const router = Router();
router.post(
  "/",
  verifyToken,
  CoverLetterCreationLimiter,
  validate(createCoverLetterSchema),
  createCoverLetter,
);
router.get("/", verifyToken, getCoverLettersLimiter, getAllCoverLetters);
router.get(
  "/:id",
  verifyToken,
  getSingleCoverLetterLimiter,
  getCoverLetterById,
);
router.put(
  "/:id",
  verifyToken,
  coverLetterBuilderLimiter,
  validate(idParamSchema, "params"),
  validate(updateCoverLetterSchema),
  updateCoverLetter,
);
router.delete("/:id", verifyToken, deleteCoverLetterLimiter, deleteCoverLetter);
export default router;
