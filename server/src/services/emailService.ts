import nodemailer from "nodemailer";
import { IEmailService } from "../models/emailModel";
import { config } from "dotenv";

config();

class EmailService implements IEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log(process.env.EMAIL_USER, " ", process.env.EMAIL_PASSWORD);
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    console.log("send otp", email, " ", otp);
    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
    };
    console.log(message);
    await this.transporter.sendMail(message);
  }
}

export const emailService = new EmailService();
