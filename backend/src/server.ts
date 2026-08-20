import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.route";
import dashboardRoutes from "./routes/dashboard.route";
import resumeRoutes from "./routes/resume.route";
import coverletterRoutes from "./routes/coverletter.route";
import "./models";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;

const configuredFrontend = (process.env.FRONTEND_URL || "")
  .trim()
  .replace(/['"\r\n]/g, "")
  .replace(/\/$/, "");

const allowedOrigins = [
  configuredFrontend,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.trim().replace(/\/$/, "").toLowerCase();

    const isAllowed =
      allowedOrigins.some(
        (allowed) => allowed.toLowerCase() === normalizedOrigin,
      ) ||
      normalizedOrigin.endsWith(".vercel.app") ||
      normalizedOrigin.includes("vercel.app");

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "X-Retry-Attempted",
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400,
};

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/cover-letters", coverletterRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({ success: true, message: "ResumeUp backend is running!" });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
