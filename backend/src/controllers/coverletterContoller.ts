import { Response, NextFunction } from "express";
import CoverLetter from "../models/Coverletter";
import { AuthRequest } from "../types/auth";
import {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} from "../utils/AppError";
import {
  CoverLetterResponse,
  GetAllCoverLettersResponse,
  DeleteResponse,
} from "../types/ResponseTypes";

export const createCoverLetter = async (
  req: AuthRequest,
  res: Response<CoverLetterResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { Title, Data, TemplateId } = req.body;

    if (!Title || !TemplateId) {
      throw new BadRequestError("Missing required fields: Title or TemplateId");
    }

    if (typeof Title !== "string" || typeof TemplateId !== "string") {
      throw new BadRequestError("Title and TemplateId must be strings");
    }

    const coverletter = await CoverLetter.create({
      userId: req.user.id,
      Title,
      TemplateId,
      Data: Data && typeof Data === "object" ? Data : {},
    });

    res.status(201).json({
      success: true,
      message: "Cover Letter created successfully",
      coverletter,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCoverLetters = async (
  req: AuthRequest,
  res: Response<GetAllCoverLettersResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.user) {
      const coverletters = await CoverLetter.findAll({
        where: { userId: req.user.id },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        success: true,
        message: "User cover letters fetched successfully",
        count: coverletters.length,
        coverletters,
        isGuest: false,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Guest mode activated",
      count: 0,
      coverletters: [],
      isGuest: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getCoverLetterById = async (
  req: AuthRequest,
  res: Response<CoverLetterResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const coverletter = await CoverLetter.findOne({
      where: {
        Id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!coverletter) {
      throw new NotFoundError("Cover letter not found");
    }

    res.status(200).json({
      success: true,
      message: "Cover letter fetched successfully",
      coverletter,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCoverLetter = async (
  req: AuthRequest,
  res: Response<CoverLetterResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const coverletter = await CoverLetter.findOne({
      where: {
        Id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!coverletter) {
      throw new NotFoundError("Cover letter not found");
    }

    const { Title, Data } = req.body;

    const updateFields: Partial<Pick<typeof coverletter, "Title" | "Data">> =
      {};

    if (Title !== undefined) {
      if (typeof Title !== "string") {
        throw new BadRequestError("Title must be a string");
      }
      updateFields.Title = Title;
    }

    if (Data !== undefined) {
      if (typeof Data !== "object" || Data === null || Array.isArray(Data)) {
        throw new BadRequestError("Data must be an object");
      }
      updateFields.Data = Data;
    }

    const updatedCoverLetter = await coverletter.update(updateFields);

    res.status(200).json({
      success: true,
      message: "Cover letter updated successfully",
      coverletter: updatedCoverLetter,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCoverLetter = async (
  req: AuthRequest,
  res: Response<DeleteResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const coverletter = await CoverLetter.findOne({
      where: {
        Id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!coverletter) {
      throw new NotFoundError("Cover letter not found");
    }

    await coverletter.destroy();

    res.status(200).json({
      success: true,
      message: "Cover letter deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
