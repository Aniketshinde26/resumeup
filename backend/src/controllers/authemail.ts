import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail"; // Adjust path as needed

export const testEmailController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
       const resetUrl = `http://localhost:5173/reset-password/test-token-123`
        await sendEmail({
            email: email,
            subject: "Password Reset Test",
            message: resetUrl,
        });

        res.status(200).json({ 
            success: true, 
            message: "Real email sent successfully!" 
        });

    } catch (error: any) {
        console.error("Email Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to send email",
            error: error.message 
        });
    }
};