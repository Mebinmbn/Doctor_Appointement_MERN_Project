import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes";
import otpRoutes from "./routes/otpRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Middleware
app.use(express.json());

dbConnect();

// Test route
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("Server is live!");
});

app.use("/api/patients", patientRoutes);
app.use("/api/otp", otpRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
