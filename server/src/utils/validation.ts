import { IPatient } from "../models/patientModel";

const validatePatientSignup = (patientData: IPatient) => {
  console.log("Reached validation");
  if (
    !patientData.firstName ||
    !patientData.lastName ||
    !patientData.email ||
    !patientData.phone
  ) {
    throw new Error("All fields are required");
  }
  // Additional validation logic can be added here
};

const validatePatientSignin = (patientData: IPatient) => {
  if (!patientData.email || !patientData.password) {
    throw new Error("All fields are required");
  }
};

export default { validatePatientSignup, validatePatientSignin };
