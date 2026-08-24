import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";
import { AppError } from "./AppError";
import { SendEmailOptions, BrevoApiError } from "../types/SendEmail";

dotenv.config();

if (!process.env.BREVO_API_KEY) {
  console.error("⚠️ CRITICAL: BREVO_API_KEY is missing from process.env!");
}

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY || "",
});

export const sendEmail = async (
  options: SendEmailOptions,
): Promise<unknown> => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: options.subject,
      sender: {
        name: "ResumeUp Support",
        email: process.env.EMAIL_FROM || "support@resumeup.dev",
      },
      to: [{ email: options.email }],
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e293b; margin-bottom: 16px;">Password Reset Request</h2>
          <p style="color: #475569; font-size: 15px; line-height: 1.5;">
            We received a request to reset your password for your <strong>ResumeUp</strong> account.
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${options.message}"
               style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #64748b; font-size: 13px; line-height: 1.4; word-break: break-all;">
            Button not working? Copy and paste this link into your browser:<br />
            <a href="${options.message}" style="color: #2563eb; word-break: break-all;">${options.message}</a>
          </p>
          <p style="color: #64748b; font-size: 13px; line-height: 1.4;">
            This link is valid for <strong>1 hour</strong>. If you did not request a password reset, please ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} ResumeUp. All rights reserved.
          </p>
        </div>
      `,
    });

    return result;
  } catch (err: unknown) {
    const brevoErr = err as BrevoApiError;
    const errorMessage =
      brevoErr.body?.message ||
      brevoErr.message ||
      "Failed to send email via Brevo";

    console.error("❌ BREVO SDK EXCEPTION:", brevoErr.body || errorMessage);
    throw new AppError(errorMessage, 500);
  }
};
