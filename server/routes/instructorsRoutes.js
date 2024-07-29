import { Router } from "express";
import { getInstructor, getInstructors } from "../controllers/instructorsControllers.js";

const router = Router();

router.get('/', getInstructors);
router.get('/:instructorId', getInstructor);

export default router;