import Course from "../models/courseModel.js";
import HttpError from "../models/errorModel.js";
import User from "../models/user.model.js";
import Enrollment from "../models/enrollmentModel.js";

//Enroll students
// API Endpoint: api/courses/:courseId/enroll
// Protected
export const enrollStudent = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user?.id;
    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);
    if (!course) {
      throw new HttpError("Course not found", 404);
    }
    if (!student) {
      return next(new HttpError("Student not found", 404));
    }
    const existingEnrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    });
    if (existingEnrollment) {
      throw new HttpError("Student already enrolled in this course", 400);
    }

    const newEnrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    student.enrollments.push(newEnrollment._id);
    await student.save();

    course.enrollments.push(newEnrollment._id);
    course.students.push(studentId);
    await course.save();

    res.status(201).json({
      message: "Student enrolled successfully",
      enrollments: newEnrollment,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to enroll", 500));
  }
};

// Get ENROLLED AT ONE Course
// API: api/courses/:courseId/enroll/
// Protected
export const myStudents = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;
    const course = await Course.findById(courseId).populate("instructor");
    if (!course) return next(new HttpError("Course not found", 404));
    if (course.instructor._id !== instructorId) {
      return null;
    }
    const studentsEnrolled = course.students;
    if (!studentsEnrolled || studentsEnrolled.length === 0) {
      return next(new HttpError("No students enrolled"), 415);
    }

    res.status(200).json(studentsEnrolled);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Internal server error", 500));
  }
};

// Courses enrolled by a student
// API: api/students/:studentId/courses
// Protected
export const myCourses = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    if (studentId !== req.user.id) {
      return next(new HttpError("Unauthorized", 401));
    }
    const student = await User.findById(studentId).populate(
      "enrollments",
      "course dateEnrolled"
    );
    if (!student) {
      return next(new HttpError("Student not found", 404));
    }
    const courses = await Promise.all(
      student.enrollments.map(async (course) => {
        const foundCourse = await Course.findById(course.course).populate(
          "instructor"
        );
        return {
          id: foundCourse._id,
          course: foundCourse.title,
          dateEnrolled: course.dateEnrolled,
          instructor: foundCourse.instructor.name,
        };
      })
    );
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Internal server error", 500));
  }
};

// Unenroll
// API: api/courses/:courseId/unenroll
// Protected
export const UnEnrollFromACourse = async (req, res, next) => {
  try {
    const {courseId} = req.params;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOneAndDelete({
      course: courseId,
      student: studentId,
    });

    if(!enrollment) return next(new HttpError("Enrollment not found", 404));

    await User.findByIdAndUpdate(studentId, {
      $pull: {enrollments: enrollment._id}
    });

    await Course.findByIdAndUpdate(courseId, {
      $pull: {enrollments: enrollment._id, students: studentId}
    });

    res.status(200).json({
      message: "Student unenrolled successfully"
    })
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to de-enroll course"));
  }
};
