import patientRepository from "../repositories/patientRepository";
import { IPatient } from "../models/patientModel";
import validation from "../utils/validation";
import { comparePassword, hashPassword } from "../services/bcryptService";
import { generateToken } from "../services/tokenService";

export const signUpPatient = async (patientData: IPatient) => {
  console.log("reched useCases", patientData);
  validation.validatePatientSignup(patientData);
  const existingPatient = await patientRepository.findPatientByEmail(
    patientData.email
  );
  if (existingPatient) {
    throw new Error("User already exist with this email");
  }
  patientData.password = await hashPassword(patientData.password);
  const patient = await patientRepository.createPatient(patientData);
  return patient;
};

export const signInPatient = async (
  email: string,
  password: string
): Promise<string> => {
  const patient = await patientRepository.findPatientByEmail(email);
  if (!patient) {
    throw new Error("User not found");
  }
  const isPasswordValid = await comparePassword(password, patient.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(patient.id);
  return token;
};
