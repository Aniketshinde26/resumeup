import { Request, Response } from "express";
import Resume from "../models/Resume";
import { AuthRequest } from "../types/ResumeAuthTypes";
import { GetAllResumesResponse, resumeByIdResponse } from "../types/ResponseTypes";


/**
 * @desc Create a new resume for the authenticated user
 * @param req Authenticated request
 * @param res Express response
 * @returns Created resume (201)
 */
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

/**
 * @desc Get all resumes for the authenticated user (or guest mode if no user)
 * @param req Authenticated request or guest request (via optionalToken middleware)
 * @param res Express response
 * @returns All resumes for the authenticated user or guest mode data (200)
 */

export const getAllResumes = async (
  req: Request, 
  res: Response
): Promise<Response> => {
  try {
    if (req.user) {
      const resumes = await Resume.findAll({
        where: { userId: req.user.id },
        order: [["createdAt", "DESC"]],
      });

      // Explicitly type the payload
      const payload: GetAllResumesResponse = {
        message: "User resumes fetched successfully",
        count: resumes.length, // TypeScript confirms this is a number
        resumes,
        isGuest: false 
      };

      return res.status(200).json(payload);
    }

    // Explicitly type the guest payload
    const guestPayload: GetAllResumesResponse = {
      message: "Guest mode active",
      count: 0,
      resumes: [],
      isGuest: true 
    };

    return res.status(200).json(guestPayload);

  } catch (error) {
    console.error("GET ALL RESUMES ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

/**
 * @desc Get a single resume by ID for the authenticated user
 * @param req Authenticated request with resume ID in params
 * @param res Express response
 * @return Single resume if found and belongs to user (200), 404 if not found, 401 if unauthorized
  */

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

  const payload: resumeByIdResponse = {
      message: "Resume fetched successfully",
      resume,
    };
    return res.status(200).json(payload);

  } catch (error) {
    console.error("GET RESUME BY ID ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch resume" });
  }
};

/**
 * @desc Update a resume by ID for the authenticated user
 * @param req Authenticated request with resume ID in params and updated data in body 
 * @param res Express response
 * @returns Updated resume data (200) or error if not found/unauthorized
 */

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

/**
 * @desc Delete a resume by ID for the authenticated user
 * @param req Authenticated request with resume ID in params
 * @param res Express response
 * @returns Success message (200) or error if not found/unauthorized
 */
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
