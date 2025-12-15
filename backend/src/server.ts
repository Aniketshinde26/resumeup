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
const app = express();

// CORS configuration

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
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

// Manual CORS headers as backup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,X-Requested-With,Accept,Origin"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resumes", resumeRoutes);

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
