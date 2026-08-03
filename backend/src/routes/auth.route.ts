import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  googleLogin,
  githubLogin,
  forgotPassword,
  resetPassword,
} from "../controllers/authcontrollers";
import { authLimiter, oauthLimiter, forgotPasswordLimiter, logoutLimiter,refreshLimiter, loginLimiter,resetPasswordLimiter } from "../middleware/rateLimiter";
const router = Router();
router.post("/register", authLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/logout", logoutLimiter, logoutUser);
router.post("/google", oauthLimiter, googleLogin);
router.post("/refresh", refreshLimiter, refreshAccessToken);
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPasswordLimiter, resetPassword);
router.post("/github", oauthLimiter, githubLogin);

export default router;
