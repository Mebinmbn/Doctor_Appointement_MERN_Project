import mongoose, { Document, Schema, Model } from "mongoose";
import { ObjectId } from "mongoose";

export interface IPatient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  gender: "Male" | "Female" | "Other";
  address: ObjectId;
  password: string;
  isVerified: boolean;
  registeredAt: Date;
}

const PatientSchema: Schema = new Schema<IPatient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now },
});

const PatientModel: Model<IPatient> = mongoose.model<IPatient>(
  "Patient",
  PatientSchema
);

export default PatientModel;
