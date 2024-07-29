import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { myCourses } from "../controllers/enrollmentControllers.js";

const router = Router();

router.get('/:studentId/courses', authMiddleware, roleMiddleware('student'), myCourses);

export default router;