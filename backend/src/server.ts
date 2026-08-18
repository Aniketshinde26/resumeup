import dotenv from "dotenv";
dotenv.config();

import express from "express";
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

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL environment variable is required");
}

const app = express();
const PORT = process.env.PORT || 5000;

const configuredFrontend = process.env.FRONTEND_URL.trim()
  .replace(/['"\r\n]/g, "")
  .replace(/\/$/, "");

const allowedOrigins = [
  configuredFrontend,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean) as string[];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (
      allowedOrigins.includes(normalizedOrigin) ||
      normalizedOrigin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy blocked origin: ${origin}`));
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
  maxAge: 86400,
};

app.use(helmet());
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/cover-letters", coverletterRoutes);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "ResumeUp backend is running!" });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {});
  } catch (error) {
    process.exit(1);
  }
};

startServer();
