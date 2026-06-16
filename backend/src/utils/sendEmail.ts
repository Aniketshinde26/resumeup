import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); 

export const sendEmail = async (options: any) => {
    const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_FROM, 
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"ResumeUp Support" <${process.env.EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<b>Reset Link:</b> <a href="${options.message}">${options.message}</a>`,
    };

    return await transporter.sendMail(mailOptions);
};