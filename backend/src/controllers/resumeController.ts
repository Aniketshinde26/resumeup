import { NextFunction, Request, Response } from "express";
import Resume from "../models/Resume";
import { AuthRequest } from "../types/auth";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from "../utils/AppError";
import {
  GetAllResumesResponse,
  ResumeResponse,
  DeleteResponse,
} from "../types/ResponseTypes";

export const createResume = async (
  req: AuthRequest,
  res: Response<ResumeResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }
    const { title, templateId, data } = req.body;
    if (!title || !templateId || !data) {
      throw new BadRequestError(
        "Missing required fields: title, templateId, or data",
      );
    }
    if (typeof title !== "string" || typeof templateId !== "string") {
      throw new BadRequestError("title and templateId must be strings");
    }
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new BadRequestError("data must be an object");
    }
    const resume = await Resume.create({
      userId: req.user.id,
      title,
      templateId,
      data,
    });
    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllResumes = async (
  req: AuthRequest,
  res: Response<GetAllResumesResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.user) {
      const resumes = await Resume.findAll({
        where: { userId: req.user.id },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        success: true,
        message: "User resumes fetched successfully",
        count: resumes.length,
        resumes,
        isGuest: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Guest mode active",
      count: 0,
      resumes: [],
      isGuest: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (
  req: AuthRequest,
  res: Response<ResumeResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { id } = req.params;
    const resume = await Resume.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      throw new NotFoundError("Resume not found");
    }

    res.status(200).json({
      success: true,
      message: "Resume fetched successfully",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

export const updateResume = async (
  req: AuthRequest,
  res: Response<ResumeResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { id } = req.params;
    const { title, data } = req.body;

    const resume = await Resume.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      throw new NotFoundError("Resume not found");
    }

    const updateFields: Partial<Pick<typeof resume, "title" | "data">> = {};

    if (title !== undefined) {
      if (typeof title !== "string") {
        throw new BadRequestError("Title must be a string");
      }
      updateFields.title = title;
    }

    if (data !== undefined) {
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        throw new BadRequestError("Data must be an object");
      }
      updateFields.data = data;
    }

    await resume.update(updateFields);

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (
  req: AuthRequest,
  res: Response<DeleteResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { id } = req.params;

    const resume = await Resume.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!resume) {
      throw new NotFoundError("Resume not found");
    }

    await resume.destroy();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
