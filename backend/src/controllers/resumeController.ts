import { Response } from "express";
import Resume from "../models/Resume";
import { AuthRequest } from "../types/ResumeAuthTypes";

export const createResume = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, templateId, data } = req.body;

    if (!title || !templateId || !data) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      title,
      templateId,
      data,
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("CREATE RESUME ERROR:", error);
    return res.status(500).json({ message: "Failed to create resume" });
  }
};
