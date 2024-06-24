import express from "express";
import { StudentControllers } from "./students.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { updateStudentValidationSchema } from "./students.validator";

const router = express.Router();

// router.post("/create-student", StudentControllers.createStudent);

router.get("/", StudentControllers.getAllStudents);

router.get("/:id", StudentControllers.getSingleStudent);
router.delete("/:id", StudentControllers.deleteStudent);
router.patch("/:id", validateRequest(updateStudentValidationSchema), StudentControllers.updateStudent)

export const StudentRoutes = router;
