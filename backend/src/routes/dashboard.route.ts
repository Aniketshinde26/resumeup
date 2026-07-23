import { Router } from "express";
import { verifyToken } from "../middleware/authmiddleware";
import {dashboardLimiter} from "../middleware/rateLimiter";

const router = Router();

router.get("/", verifyToken, dashboardLimiter, (req, res) => {
  res.json({ message: "Welcome to your dashboard!", user: req.user });
});

export default router;
