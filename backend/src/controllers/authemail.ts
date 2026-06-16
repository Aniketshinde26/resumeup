import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail"; // Adjust path as needed
import User from "../models/User"; // Adjust path as needed
import crypto from "crypto"; // 🛠️ Added crypto import for hashing tokens

export const testEmailController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(200).json({ 
                success: true, 
                message: "If an account exists, a real email has been sent successfully!." 
            });
        }

        const oneDayInMs = 24 * 60 * 60 * 1000;
        // 🧪 DEVELOPMENT SHORTCUT: If testing locally, make the cool-down only 1 minute so you don't have to wait 7 days!
        const coolDownPeriodInMs = process.env.NODE_ENV === "development"
            ? 1 * 60 * 1000  // 1 minute for local testing
            : 7 * oneDayInMs; // 7 days for production

        const currentTime = Date.now();
        const accountAgeInMs = currentTime - user.createdAt.getTime();
        if (accountAgeInMs < coolDownPeriodInMs) {
            const timeRemaining = coolDownPeriodInMs - accountAgeInMs;
            const unitRemaining = process.env.NODE_ENV === "development" 
                ? `${Math.ceil(timeRemaining / 1000)} seconds(s)`
                : `${Math.ceil(timeRemaining / oneDayInMs)} day(s)`;
            return res.status(403).json({ 
                success: false, 
                message: `Please wait ${unitRemaining} before requesting another email.` 
                });
        }

        if (user.passwordChangedAt) {
            const timeSinceLastChange = currentTime - new Date(user.passwordChangedAt).getTime();
            if (timeSinceLastChange < coolDownPeriodInMs) {
                const timeRemaining = coolDownPeriodInMs - timeSinceLastChange;
                const unitRemaining = process.env.NODE_ENV === "development"
                    ? `${Math.ceil(timeRemaining / 1000)} seconds(s)`
                    : `${Math.ceil(timeRemaining / oneDayInMs)} day(s)`;
                return res.status(403).json({
                    success: false,
                    message: `Security Limit: You recently changed your password. You can request another link in ${unitRemaining}.`
                });
            }
        }

        // 🛠️ FIX: Defining the token and updating the user in the database
        const testToken = "test-token-123";
        const hashedToken = crypto.createHash("sha256").update(testToken).digest("hex");

        // Save the hash to the database so resetPassword can find it later
        await user.update({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: new Date(Date.now() + 3600000) // Valid for 1 hour
        });

        const resetUrl = `http://localhost:5173/reset-password/${testToken}`;
        
        const smtpResult = await sendEmail({
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