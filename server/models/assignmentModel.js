import mongoose, { Schema, Types, model } from "mongoose";

const assignmentSchema = new Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {timestamps: true});

export default model('Assignment', assignmentSchema);