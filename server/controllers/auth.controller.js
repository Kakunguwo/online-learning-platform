import jwt from "jsonwebtoken";
import HttpError from "../models/errorModel.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const register = async (req, res, next) => {
    try {
        const {name, email, password, confirmPassword} = req.body;
        if(!name || !email || !password || !confirmPassword){
            return next(new HttpError("Fill in all fields!", 421));
        };

        //email validation

        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({email: newEmail});
        if(emailExists){
            return next(new HttpError("Email already exists!!!", 421));
        }

        //Password validation
        if((password.toString()).length < 6){
            return next(new HttpError("Password should be more than 6 characters!", 421));
        }

        if(password !== confirmPassword){
            return next(new HttpError("Passwords do not match!", 421));
        }

        //lets hash the password using bcryptjs

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create({name, email: newEmail, password: hashedPassword});

        //check if user was created or not
        if(!newUser){
            return next(new HttpError("Failed to create account. Try again!!!"));
        };

        //send response
        res.status(200).json(newUser);

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Fill all fields!", 421));
        }
        //validate email
        const newEmail = email.toLowerCase();
        await User.findOne({email: newEmail})
            .then((user) => {
                if(!user){
                    return next(new HttpError("User does not exist!", 421));
                }

                //password check

                bcrypt.compare(password, user.password, (err, data)=>{
                    if(err){
                        return next(new HttpError(err));
                    }

                    if(data){
                        const {password: pass, ...userInfo } = user._doc;

                        const token = jwt.sign({id: userInfo._id} , process.env.JWT_SECRET);
                        res
                            .cookie('access-token', token, {httpOnly: true})
                            .status(200)
                            .json({userInfo});

                    } else {
                        return next(new HttpError("Invalid credentials", 421));
                    }
                })
            })
    } catch (error) {
        return next(new HttpError(error));
    }
};


export const googleAuth = async (req, res, next) => {
    try {
        const {name, email } = req.body;
        const user = await User.findOne({email});
        if(user){
            const {password: pass, ...userInfo } = user._doc;

            const token = jwt.sign({id: userInfo._id} , process.env.JWT_SECRET);
            res
                .cookie('access-token', token, {httpOnly: true})
                .status(200)
                .json({userInfo});
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(generatedPassword, salt);
            const newUser = await User.create({name, email, password: hashedPassword, avatar: photo});

            const {password: pass, ...userInfo } = user._doc;

            const token = jwt.sign({id: userInfo._id} , process.env.JWT_SECRET);
            res
                .cookie('access-token', token, {httpOnly: true})
                .status(200)
                .json({userInfo});
        }
    } catch (error) {
        next(error);
    }
}