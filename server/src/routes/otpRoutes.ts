import express from "express";
import { sendVerification, verify } from "../controllers/otpController";

const router = express.Router();

router.post("/send", sendVerification);
router.post("/verify", verify);

export default router;
