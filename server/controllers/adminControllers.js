import HttpError from "../models/errorModel.js";
import { getAllUsers } from "../utils/getUser.js";

//get all user
//API: /api/admin/all_users
export const getUsers = async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log(error);
        return next(new HttpError("Failed to get all users", 421));
    }
}