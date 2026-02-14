import { Request, Response } from "express";
import CoverLetter from "../models/Coverletter";
import { AuthRequest } from "../types/ResumeAuthTypes";

/***
 * @desc Create a new cover letter for the authenticated user
 * @param req Authenticated request
 * @param res Express response
 * @returns Created cover letter (201)
 */

export const createCoverLetter = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { title, data, templateId } = req.body;
    if (!data || !templateId || !title) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const coverletter = await CoverLetter.create({
      userId: req.user.id,
      Title: title,
      TemplateId: templateId,
      Data: data,
    });
    
    return res.status(201).json({
      message: "Cover Letter created successfully",
      coverletter,
    });
  } catch (error) {
    console.error("CREATE COVER LETTER ERROR:", error);
    return res.status(500).json({ message: "Failed to create cover letter" });
  };
};

/**
 * @desc Get all cover letters for the authenticated user (or guest mode if no user)
 * @param req 
 * @param res 
 * @returns All cover letters for the authenticated user or guest mode data (200)
 * 
 */

export const getAllCoverLetters = async (
  req: Request, 
  res: Response
): Promise<Response> => {
  try {
    if (req.user) {
        const coverletters = await CoverLetter.findAll({
            where: { userId: req.user.id },
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({
            message: "User cover letters fetched successfully",
            count: coverletters.length,
            coverletters,
            isGuest: false 
        });
    }
    return res.status(200).json({
        message: "Guest mode activated",
        count: 0,
        coverletters: [],
        isGuest: true 
    });
  }catch (error) {
    console.error("GET COVER LETTERS ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch cover letters" });
  }
};

/**
 * @desc Get a single cover letter by ID for the authenticated user
 * @param req Authenticated request with cover letter ID in params
 * @param res Express response
 * @returns Cover letter data (200) or error if not found/unauthorized
 */
export const getCoverLetterById = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const coverLetter = await CoverLetter.findByPk(req.params.id);
    if (!coverLetter) {
      return res.status(404).json({ message: "Cover letter not found" });
    }
    if (coverLetter.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return res.status(200).json({
      message: "Cover letter fetched successfully",
      coverletter: coverLetter,
    });
  } catch (error) {
    console.error("GET COVER LETTER BY ID ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch cover letter" });
  }
};

/**
 * @desc Update a cover letter by ID for the authenticated user
 * @param req Authenticated request with cover letter ID in params and updated data in body     
 * @param res Express response
 * @returns Updated cover letter data (200) or error if not found/unauthorized
 */

export const updateCoverLetter = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {        
        return res.status(401).json({ message: "Unauthorized" });
    }
    const coverLetter = await CoverLetter.findByPk(req.params.id);
    if (!coverLetter) {
      return res.status(404).json({ message: "Cover letter not found" });
    }
    if (coverLetter.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const updatedCoverLetter = await coverLetter.update(req.body);
    return res.status(200).json({
      message: "Cover letter updated successfully",
      coverletter: updatedCoverLetter,
    });
  } catch (error) {
    console.error("UPDATE COVER LETTER ERROR:", error);
    return res.status(500).json({ message: "Failed to update cover letter" });
  }
};

/**
 * @desc Delete a cover letter by ID for the authenticated user
 * @param req Authenticated request with cover letter ID in params
 * @param res Express response
 * @returns Success message (200) or error if not found/unauthorized    
 */

export const deleteCoverLetter = async (
    req: AuthRequest,
    res: Response
): Promise<Response> => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const coverLetter = await CoverLetter.findByPk(req.params.id);
        if (!coverLetter) {
            return res.status(404).json({ message: "Cover letter not found" });
        }
        if (coverLetter.userId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await coverLetter.destroy();
        return res.status(200).json({ message: "Cover letter deleted successfully" });
    } catch (error) {
        console.error("DELETE COVER LETTER ERROR:", error);
        return res.status(500).json({ message: "Failed to delete cover letter" });
    }
};