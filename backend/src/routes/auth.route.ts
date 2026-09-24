import { Router } from "express";
import { validate } from "../middleware/validate";
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
import {
  authLimiter,
  oauthLimiter,
  forgotPasswordLimiter,
  logoutLimiter,
  refreshLimiter,
  loginLimiter,
  resetPasswordLimiter,
  loginEmailLimiter,
  forgotPasswordEmailLimiter,
} from "../middleware/rateLimiter";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  tokenParamSchema,
  googleSchema,
  githubSchema,
} from "../validations/authSchemas";
const router = Router();
router.post("/register", authLimiter, validate(registerSchema), registerUser);
router.post(
  "/login",
  loginLimiter,
  loginEmailLimiter,
  validate(loginSchema),
  loginUser,
);
router.post("/logout", logoutLimiter, logoutUser);
router.post("/google", oauthLimiter, validate(googleSchema), googleLogin);
router.post("/refresh", refreshLimiter, refreshAccessToken);
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPasswordEmailLimiter,
  validate(forgotPasswordSchema),
  forgotPassword,
);
router.post(
  "/reset-password/:token",
  resetPasswordLimiter,
  validate(tokenParamSchema, "params"),
  validate(resetPasswordSchema),
  resetPassword,
);
router.post("/github", oauthLimiter, validate(githubSchema), githubLogin);

export default router;
