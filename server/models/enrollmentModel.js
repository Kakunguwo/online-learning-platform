import mongoose, { Schema, model } from "mongoose";

const enrollmentSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    dateEnrolled: {
        type: Date,
        default: Date.now,
    }
});

export default model('Enrollment', enrollmentSchema);