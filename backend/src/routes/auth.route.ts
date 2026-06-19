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
import { getMe } from "../controllers/usercontroller";
import { sendEmail } from "../utils/sendEmail";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google", googleLogin);
router.get("/me", verifyToken, getMe);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.post("/github", githubLogin);
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Token is Valid",
    user: req.user,
  });
});



export default router;
