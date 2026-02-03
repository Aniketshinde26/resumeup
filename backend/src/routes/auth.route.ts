import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  googleLogin,
  githubLogin
} from "../controllers/authcontrollers";
import { verifyToken } from "../middleware/authmiddleware";
import { getMe } from "../controllers/usercontroller";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google", googleLogin);
router.get("/me", verifyToken, getMe);
router.post("/refresh", refreshAccessToken);

router.post("/github", githubLogin);
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Token is Valid",
    user: req.user,
  });
});

export default router;
