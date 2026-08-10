import nodemailer from "nodemailer";
import logger from "../logger";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export const sendMail = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    const from = process.env.EMAIL_FROM || "noreply@ramanayam.com";
    await transporter.sendMail({ from, to, subject, html });
    logger.info(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    logger.error(`Failed to send email to ${to}`, error);
    
  }
};
