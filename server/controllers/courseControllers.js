import HttpError from "../models/errorModel.js";
import Course from "../models/courseModel.js";
import User from "../models/user.model.js";

//Create course
//API: /api/course/create
//PROTECTED
export const createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const instructorId = req.user.id;
    if (!title || !description) {
      return next(new HttpError("Fill in all details", 421));
    }

    //course titles should not be the same
    const course = await Course.findOne({ title });
    if (course) return next(new HttpError("Course title already exist", 421));

    const newCourse = await Course.create({
      title,
      description,
      instructor: instructorId,
    });
    if (!newCourse) return next(new HttpError("Failed to create course", 421));

    //update the user course list

    await User.findByIdAndUpdate(instructorId, {
      $push: { courses: newCourse._id },
    });

    res.status(200).json(newCourse);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to create course", 421));
  }
};

//Get All courses
//API: /api/course/all
//UNPROTECTED
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "-password")
      .exec();
    if (!courses || courses.length === 0)
      return next(new HttpError("No courses available", 403));
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return next(new HttpError(error));
  }
};

// Add section to course
// API Endpoint: '/:courseId/sections'
// Protected
export const addSectionToCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;
    const course = await Course.findById(courseId);
    if (req.user.id !== course.instructor.toString()) {
      return next(
        new HttpError("You can not add sections to this course", 421)
      );
    }

    if (!title) return next(new HttpError("Title is required", 421));

    const sectionExists = course.sections.find(
      (section) => section.title === title
    );
    if (sectionExists) {
      return next(new HttpError("Section with this title already exists", 421));
    }

    course.sections.push({ title, lessons: [] });
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to add section", 403));
  }
};

// Add Lesson to sections
// API: /:courseId/sections/:sectionId/lessons
// Protected
export const addLessonToSection = async (req, res, next) => {
  try {
    let content;
    const { courseId, sectionId } = req.params;
    const { title, duration } = req.body;
    const course = await Course.findById(courseId);
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!course) {
      return next(new HttpError("Course not found", 404));
    }
    if (!section) {
      return next(new HttpError("Section not found", 404));
    }

    if (req.file) {
      content = req.file;
    }

    if (req.user.id !== course.instructor.toString()) {
      return next(new HttpError("You can not add lessons to this course", 421));
    }

    const lessonTitleExists = await section.lessons.find(
      (lesson) => lesson.title === title
    );

    if (lessonTitleExists) {
      return next(new HttpError("Lesson title already exists", 421));
    }

    section.lessons.push({ title, duration, content: req.file.path });
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to add lesson", 403));
  }
};

////////////////////

// DELETE Course
// API Endpoint: /api/courses/:courseId
// Protected
export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return next(new HttpError("Course not found", 404));

    if (req.user.id !== course.instructor.toString()) {
      return next(new HttpError("You cannot delete this course!", 403));
    } else {
      await Course.findByIdAndDelete(courseId);
      res.status(200).json("Successfully deleted the course!");
    }
  } catch (error) {
    console.log(error);
  }
};

// DELETE Section from course
// API Endpoint: /api/courses/:courseId/sections/:sectionId
// Protected
export const deleteSectionFromCourse = async (req, res, next) => {
  try {
    const { courseId, sectionId } = req.params;
    const course = await Course.findById(courseId);
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );

    if (!course) {
      return next(new HttpError("Course not found", 404));
    }
    if (!section) {
      return next(new HttpError("Section not found", 404));
    }

    if (req.user.id !== course.instructor.toString()) {
      return next(new HttpError("You can not delete this section", 421));
    } else {
      await section.deleteOne();
      await course.save();
      res.status(200).json("Successfully deleted the section!");
    }
  } catch (error) {
    console.log(error);
  }
};

// GET single course
// API Endpoint: /api/courses/:courseId
// Protected
export const getSingleCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate(
      "instructor",
      "-password"
    );
    if (!course) return next(new HttpError("Course not found", 404));
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
  }
};

// GET all section
// API Endpoint: /api/courses/:courseId/sections
// Protected
export const getAllSections = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return next(new HttpError("Course not found", 404));
    res.status(200).json(course.sections);
  } catch (error) {
    console.log(error);
  }
};

// GET single section
// API Endpoint: /api/courses/:courseId/sections/:sectionId
// Protected
export const getSingleSection = async (req, res, next) => {
  try {
    const { courseId, sectionId } = req.params;
    const course = await Course.findById(courseId);
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!course) return next(new HttpError("Course not found", 404));
    if (!section) return next(new HttpError("Section not found", 404));
    res.status(200).json(section);
  } catch (error) {
    console.log(error);
  }
};

// GET single lesson
// API Endpoint: /api/courses/:courseId/sections/:sectionId/lessons/:lessonId
// Protected
export const getLesson = async (req, res, next) => {
  try {
    const { courseId, sectionId, lessonId } = req.params;
    const course = await Course.findById(courseId);
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!course) return next(new HttpError("Course not found", 404));
    if (!section) return next(new HttpError("Section not found", 404));

    const lesson = section.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) return next(new HttpError("Lesson not found", 404));
    res.status(200).json(lesson);
  } catch (error) {
    console.log(error);
  }
};

// GET all lessons
// API Endpoint: /api/courses/:courseId/sections/:sectionId/lessons
// Protected
export const getAllLesson = async (req, res, next) => {
  try {
    const { courseId, sectionId } = req.params;
    const course = await Course.findById(courseId);
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!course) return next(new HttpError("Course not found", 404));
    if (!section) return next(new HttpError("Section not found", 404));
    res.status(200).json(section.lessons);
  } catch (error) {
    console.log(error);
  }
};

// Delete lesson
// API: /api/courses/:courseId/sections/:sectionId/lessons/:lessonId
// Protected
export const deleteLesson = async (req, res, next) => {
  try {
    const { courseId, sectionId, lessonId } = req.params;
    const course = await Course.findById(courseId);
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!course) return next(new HttpError("Course not found", 404));
    if (!section) return next(new HttpError("Section not found", 404));

    const lesson = section.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    console.log(lesson);
    if (!lesson) return next(new HttpError("Lesson not found", 404));

    await lesson.deleteOne();
    await course.save();
    res.status(200).json("Successfully deleted the course");
  } catch (error) {
    console.log(error);
    return next(new HttpError("An Error occurred", 421));
  }
};

//Update

// Update course: PATCH
// API endpoint: /api/courses/:id
// Protected
export const upDateCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return next(new HttpError("Course not found", 404));
    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    await course.save();
    res.status(200).json("Successfully updated the course");
  } catch (error) {
    console.log(error);
    return next(new HttpError("An error occurred failed to update course"));
  }
};

// Update section: PATCH
// API endpoint: /api/courses/:id/sections/:sectionId
// Protected
export const updateSection = async (req, res, next) => {
  try {
    const { title } = req.body;
    const { courseId, sectionId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return next(new HttpError("Course not found", 404));
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!section) return next(new HttpError("Section not found", 404));
    const sectionTitle = course.sections.find(
      (section) => section.title === title
    );
    if (title !== undefined || !sectionTitle) section.title = title;
    await course.save();
    res.status(200).json({
      message: "Section updated",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to update section", 421));
  }
};

// Update lesson: PATCH
// API endpoint: /api/courses/:id/sections/:sectionId/lessons/:lessonId
// Protected

export const updateLesson = async (req, res, next) => {
  try {
    const {courseId, sectionId, lessonId} = req.params;
    const {title, duration} = req.body;
    const {content} = req.files;
    const course = await Course.findById(courseId).populate("instructor", "-password");
    
  } catch (error) {
    console.log(error);
    return next(new HttpError("Failed to update lesson", 421));
  }
}
