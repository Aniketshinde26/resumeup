import nodemailer from 'nodemailer';
interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}
export const sendEmail = async (options: EmailOptions) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },  
    });

    const mailOptions = {
     from: '"ResumeUp Support" <noreply@resumeup.com>',
      to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<b>Click the link to reset your password:</b> <a href="${options.message}">${options.message}</a>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', nodemailer.getTestMessageUrl(info));
}