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
import { authLimiter, oauthLimiter, forgotPasswordLimiter, logoutLimiter,refreshLimiter } from "../middleware/rateLimiter";
const router = Router();
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/logout", logoutLimiter, logoutUser);
router.post("/google", oauthLimiter, googleLogin);
router.post("/refresh", refreshLimiter, refreshAccessToken);
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/github", oauthLimiter, githubLogin);

// using refresh instead of /protected route to verify token and get user info
// router.get("/protected", verifyToken, (req, res) => {
//   res.json({
//     message: "Token is Valid",
//     user: req.user,

//   });
// });
export default router;
