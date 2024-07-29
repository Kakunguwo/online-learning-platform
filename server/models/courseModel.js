import { Schema,model } from "mongoose";

const lessonSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true // e.g., "8min"
    },
    content: {
      type: String,
      required: true
    }
  });
  
  const sectionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    lessons: [lessonSchema]
  });

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        required: [true, 'Course description is required!']
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sections: [sectionSchema],
    assignments: [{type: Schema.Types.ObjectId, ref: 'Assignment'}],
    students: [{type: Schema.Types.ObjectId, ref: 'User'}],
    enrollments: [{type: Schema.Types.ObjectId, ref: 'Enrollment'}]
}, {timestamps: true});

export default model('Course', courseSchema);