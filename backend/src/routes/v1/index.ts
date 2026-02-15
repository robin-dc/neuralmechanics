import { Router } from "express";
import patientRoutes from "./patient.routes";
import riskRoutes from "./risk.routes";

const router = Router();

router.use("/patients", patientRoutes);
router.use("/risk-assessment", riskRoutes);

export default router;
