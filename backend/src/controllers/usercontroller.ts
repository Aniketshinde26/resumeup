// import { Request, Response } from "express";
// import User from "../models/User";

// export const getMe = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const user = await User.findByPk(req.user?.id, {
//       attributes: { exclude: ["password"] },
//     });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     return res.json({ success: true, user });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server error", error });
//   }
// };
