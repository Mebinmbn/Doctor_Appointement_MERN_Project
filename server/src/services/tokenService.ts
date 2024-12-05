import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, "mysorebank", { expiresIn: "1h" });
};
