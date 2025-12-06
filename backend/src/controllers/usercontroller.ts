import { Request, Response } from "express";
import User from "../models/User";

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user?.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
