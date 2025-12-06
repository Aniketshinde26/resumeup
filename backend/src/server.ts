import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB, sequelize } from "./config/db";
import authRoutes from "./routes/auth.route";
import dashboardRoutes from "./routes/dashboard.route";
import "./models/User";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
//BASIC TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "ResumeUp backend is running!" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Sync all models

  try {
    await sequelize.sync({ alter: true });
    console.log("Sequelize synced successfully");
  } catch (error) {
    console.error("Sequelize sync error:", error);
  }

  app.listen(PORT, () => {
    console.log(`Server strated on port ${PORT}`);
  });
};

startServer();
