import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { getUsers } from "../controllers/adminControllers.js";


const router = Router();

router.get('/all_users', authMiddleware, roleMiddleware("admin"), getUsers);

export default router;