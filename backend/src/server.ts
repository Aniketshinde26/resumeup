import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB, sequelize } from "./config/db";
import authRoutes from "./routes/auth.route";
import dashboardRoutes from "./routes/dashboard.route";
import resumeRoutes from "./routes/resume.route";
import "./models/User";
import { sendEmail } from "./utils/sendEmail";
import emailRoutes from "./routes/email.route";
import e from "express";
const app = express();

// CORS configuration

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware - this handles preflight automatically
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
// server.ts


app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/test",emailRoutes);

//BASIC TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "ResumeUp backend is running!" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Sync all models

  try {
    await sequelize.sync({ force: true });
    console.log("Sequelize synced successfully");
  } catch (error) {
    console.error("Sequelize sync error:", error);
  }

  app.listen(PORT, () => {
    console.log(`Server strated on port ${PORT}`);
  });
};

startServer();
