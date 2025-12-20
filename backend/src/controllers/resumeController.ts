import { Request, Response } from "express";
import Resume from "../models/Resume";
import { AuthRequest } from "../types/ResumeAuthTypes";

// Create Resume
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

//  Get All resumes

export const getAllResumes = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const resume = await Resume.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Resume fetched successfully",
      count: resume.length,
      resume,
    });
  } catch (error) {
    console.error("GET ALL RESUMES ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

// Get resume by id

export const getResumeById = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;

    const resume = await Resume.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume fetched successfully",
      resume,
    });
  } catch (error) {
    console.error("GET RESUME BY ID ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch resume" });
  }
};

// Update Resumes

export const updateResume = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const { title, data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Resume data is required" });
    }

    const resume = await Resume.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    await resume.update({
      title: title ?? resume.title,
      data,
    });

    return res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("UPDATE RESUME ERROR:", error);
    return res.status(500).json({ message: "Failed to update resume" });
  }
};

// Delete Resume
export const deleteResume = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const resume = await Resume.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    await resume.destroy();

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("DELETE RESUME ERROR:", error);
    return res.status(500).json({ message: "Failed to delete resume" });
  }
};
