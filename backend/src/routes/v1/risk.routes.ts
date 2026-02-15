import { Router } from "express";
import { riskAssessment } from "../../controllers/risk.controller";

const router = Router();

router.post("/", riskAssessment);

export default router;