// src/routes/auth.route.ts
import { Router } from "express";
import { testEmailController } from "../controllers/authemail";

const router = Router();

router.post("/test-email", testEmailController);

export default router;