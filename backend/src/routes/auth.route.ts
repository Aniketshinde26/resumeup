import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  googleLogin,
} from "../controllers/authControllers";
import { verifyToken } from "../middleware/authmiddleware";
import { getMe } from "../controllers/userController";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google", googleLogin);
router.get("/me", verifyToken, getMe);
router.post("/refresh", refreshAccessToken);
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    messsage: "Token is Valid",
    user: req.user,
  });
});

export default router;
