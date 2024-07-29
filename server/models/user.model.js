import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'], 
        default: 'student',
    },
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
    enrollments: [{type: Schema.Types.ObjectId, ref: 'Enrollment'}]
}, {timestamps: true});

const User = model('User', userSchema);

export default User;