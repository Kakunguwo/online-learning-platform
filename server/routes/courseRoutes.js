import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { createCourse, getAllCourses, addLessonToSection, addSectionToCourse, deleteCourse, deleteSectionFromCourse, getSingleCourse, getAllSections, getSingleSection, getAllLesson, getLesson, deleteLesson, upDateCourse, updateSection, } from "../controllers/courseControllers.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { enrollStudent, myStudents } from "../controllers/enrollmentControllers.js";


const router = Router();

router.post("/create", authMiddleware, roleMiddleware('instructor'), createCourse);
router.get("/", getAllCourses);
router.post('/:courseId/sections',authMiddleware, roleMiddleware('instructor'), addSectionToCourse);
router.post('/:courseId/sections/:sectionId/lessons',authMiddleware, roleMiddleware('instructor'), upload.single('content'),addLessonToSection);
router.delete('/:courseId', authMiddleware, roleMiddleware('instructor'), deleteCourse);
router.delete('/:courseId/sections/:sectionId', authMiddleware, roleMiddleware("instructor"), deleteSectionFromCourse);
router.get('/:courseId', authMiddleware, getSingleCourse);
router.get('/:courseId/sections', authMiddleware, getAllSections);
router.get('/:courseId/sections/:sectionId', authMiddleware, getSingleSection);
router.get('/:courseId/sections/:sectionId/lessons', authMiddleware, getAllLesson);
router.get('/:courseId/sections/:sectionId/lessons/:lessonId', authMiddleware, getLesson);
router.delete('/:courseId/sections/:sectionId/lessons/:lessonId', authMiddleware, roleMiddleware('instructor'), deleteLesson);
router.patch('/:courseId', authMiddleware, roleMiddleware('instructor'), upDateCourse);
router.patch('/:courseId/sections/:sectionId', authMiddleware, roleMiddleware('instructor'), updateSection);
router.post('/:courseId/enroll', authMiddleware, roleMiddleware('student'), enrollStudent);
router.get('/:courseId/enroll', authMiddleware, roleMiddleware('instructor'), myStudents);
router.delete('/:courseId/unenroll', authMiddleware, roleMiddleware("stu"))


export default router;