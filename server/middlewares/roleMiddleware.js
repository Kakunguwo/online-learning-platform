import HttpError from "../models/errorModel.js";
import { getUserById } from "../utils/getUser.js";

export const roleMiddleware = (userRole) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await getUserById(userId);


            if(!user || !userRole) return next(new HttpError("Access denied", 403));

            if(user.role !== userRole) return next(new HttpError("Unauthorised access", 401));

            next();

        } catch (error) {
            console.log(error);
            return next(new HttpError("Internal server error", 421));
        }
    }
} 