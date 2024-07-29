import HttpError from "../models/errorModel.js";
import User from "../models/user.model.js";

// GET instructors
// API endpoint: api/courses/instructors/
// Unprotected
export const getInstructors = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("courses", "title");
    const instructors = users.filter(
      (user) => user.courses && user.courses.length > 0
    );
    if (!instructors || instructors.length === 0) {
      return next(new HttpError("Instructors not found", 404));
    }
    res.status(200).json(instructors);
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Fetching instructors failed, please try again later.", 500)
    );
  }
};

// GET instructors
// API endpoint: api/courses/instructors/:instructorId
// Unprotected
export const getInstructor = async (req, res, next) => {
  try {
    const { instructorId } = req.params;
    const user = await User.findById(instructorId).select("-password").populate('courses', 'title');
    if (!user) return null;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
