// // src/controllers/auth.controller.ts
// import { Request, Response } from "express";
// import { sendEmail } from "../utils/sendEmail";

// export const testEmailController = async (req: Request, res: Response) => {
//   try {
//     await sendEmail({
//       email: "test@example.com",
//       subject: "ResumeUp Test",
//       message: "http://localhost:5173/reset-password?token=test-123"
//     });
//     res.json({ message: "Test email sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send test email" });
//   }
// };

