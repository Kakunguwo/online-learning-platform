import mongoose, { Schema, model } from "mongoose";

const submissionSchema = new Schema({
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateSubmitted: {
        type: Date,
        default: Date.now(),
    },
    grade: {type: Number}
}, {timestamps: true});



export default model('Submission', submissionSchema);