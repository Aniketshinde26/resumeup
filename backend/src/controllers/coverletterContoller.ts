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

    const coverletter = await CoverLetter.create({
      userId: req.user.id,
      Title,
      TemplateId,
      Data: Data || {},
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

    const updatedCoverLetter = await coverletter.update(req.body);

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
