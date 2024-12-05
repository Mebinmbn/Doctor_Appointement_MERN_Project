import express from "express";
import patientController from "../controllers/patientController";

const router = express.Router();

router.post("/signup", patientController.signUp);
router.post("/signin", patientController.signIn);

export default router;
