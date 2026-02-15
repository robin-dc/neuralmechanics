
import { Router } from "express";
import * as controller from "../../controllers/patient.controller";
import { validatePatient } from "../../middlewares/validate.middleware";
import { validateVitals } from "../../middlewares/validateVitals.middleware";


const router = Router();

router.post("/", validatePatient, controller.createPatient);
router.get("/:id", controller.getPatient);
router.get("/", controller.getAllPatients);
router.post("/:id/visits", validateVitals, controller.addVisit);

export default router;
