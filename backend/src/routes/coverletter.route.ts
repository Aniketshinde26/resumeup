import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import { optionalToken } from "../middleware/authmiddleware";
import {
  getAllCoverLetters,createCoverLetter,updateCoverLetter,deleteCoverLetter,getCoverLetterById
} from "../controllers/coverletterContoller";

const router = Router();    
router.post("/", verifyToken, createCoverLetter);
router.get("/", optionalToken, getAllCoverLetters);
router.get("/:id", optionalToken, getCoverLetterById);
router.put("/:id", verifyToken, updateCoverLetter);
router.delete("/:id", verifyToken, deleteCoverLetter);
export default router;





