import User from "../models/user.model.js";

export const getUserById = async (userId) => {
    const user = await User.findById(userId);

    if(!user) return null;

    return user;
}

export const getUserByEmail = async (userEmail) => {
    const user = await User.findOne({email: userEmail});

    if(!user) return null;

    return user;
}

export const getAllUsers = async () => {
    const users = await User.find().select('-password');

    if(!users || users.length === 0) return null;


    return users;
}

export const getUsersByRole = async (role) => {
    const users = await User.find({role: role});

    if(!users || users.length === 0) return null;

    return users;
}