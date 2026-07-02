import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  googleLogin,
  githubLogin,
  forgotPassword,
  resetPassword
} from "../controllers/authcontrollers";
import { verifyToken } from "../middleware/authmiddleware";
// import { getMe } from "../controllers/usercontroller";
import { authLimiter, oauthLimiter } from "../middleware/rateLimiter";
const router = Router();
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/logout", logoutUser);
router.post("/google", oauthLimiter, googleLogin);
// router.get("/me", verifyToken, getMe);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/github", oauthLimiter, githubLogin);
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Token is Valid",
    user: req.user,
  });
});



export default router;
