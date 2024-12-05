import PatientModel, { IPatient } from "../models/patientModel";

const verifyPatient = async (email: string): Promise<IPatient | null> => {
  const patient = await PatientModel.findOneAndUpdate(
    { email },
    { $set: { verified: true } },
    { new: true }
  );
  return patient;
};

export default verifyPatient;
