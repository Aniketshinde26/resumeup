import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB, sequelize } from "./config/db";
import authRoutes from "./routes/auth.route";
import dashboardRoutes from "./routes/dashboard.route";
import resumeRoutes from "./routes/resume.route";
import coverletterRoutes from "./routes/coverletter.route";
import "./models";
import helmet from "helmet";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
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
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400,
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/cover-letters", coverletterRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ResumeUp backend is running!" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Sequelize sync error:", error);
  }
  
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();