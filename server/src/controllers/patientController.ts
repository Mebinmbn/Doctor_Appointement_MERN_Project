import { Request, Response } from "express";
import { signInPatient, signUpPatient } from "../usecases/patientUseCases";

const signUp = async (req: Request, res: Response) => {
  try {
    const patient = await signUpPatient(req.body);
    res
      .status(200)
      .json({ sucess: true, message: "Patient created successfully", patient });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await signInPatient(email, password);
    res.status(200).json({ message: "Sign-in successful", token });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export default { signUp, signIn };
