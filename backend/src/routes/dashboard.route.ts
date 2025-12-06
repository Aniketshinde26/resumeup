import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your dashboard!", user: req.user });
});

export default router;
