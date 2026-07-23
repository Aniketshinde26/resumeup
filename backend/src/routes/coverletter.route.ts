import { Router } from "express";
import { optionalToken, verifyToken } from "../middleware/authmiddleware";
import {
  getAllCoverLetters,createCoverLetter,updateCoverLetter,deleteCoverLetter,getCoverLetterById
} from "../controllers/coverletterContoller";
import { coverLetterBuilderLimiter, CoverLetterCreationLimiter, deleteCoverLetterLimiter, getCoverLettersLimiter, getSingleCoverLetterLimiter } from "../middleware/rateLimiter";  

const router = Router();    
router.post("/", verifyToken, CoverLetterCreationLimiter, createCoverLetter);
router.get("/", optionalToken, getCoverLettersLimiter, getAllCoverLetters);
router.get("/:id", optionalToken, getSingleCoverLetterLimiter, getCoverLetterById);
router.put("/:id", verifyToken, coverLetterBuilderLimiter, updateCoverLetter);
router.delete("/:id", verifyToken, deleteCoverLetterLimiter,deleteCoverLetter);
export default router;





