import { IEmailService } from "../models/emailModel";
import patientRepository from "../repositories/patientRepository";
import { generateOTP, verifyOTP } from "../services/otpSerevice";

export const sendVerificationEmail = async (
  email: string,
  emailService: IEmailService
) => {
  console.log("otpUsecases");
  const otp = generateOTP(email);
  console.log(otp);
  await emailService.sendOTP(email, otp);
};

export const verifyEmail = async (email: string, otp: string) => {
  const isValidOtp = verifyOTP(email, otp);
  if (isValidOtp) {
    if (isValidOtp) {
      return await patientRepository.verifyPatient(email);
    }
    throw new Error("Invalid OTP");
  }
};
