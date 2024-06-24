import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../app/middlewares/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controllers";
import { AcademicFacultyValidation, creatAcademicFacultyValidationSchema, updateAcademicFacultyValidationSchema } from './academicFaculty.validation';

const router = express.Router();

router.post("/create-academic-faculty",validateRequest(creatAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFacultyIntoDB);

router.get(
    '/',
    AcademicFacultyControllers.getSingleAcademicFaculty,
  );
router.get(
    '/:facultyId',
    AcademicFacultyControllers.getSingleAcademicFaculty,
  );
  
  router.patch(
    '/:facultyId',
    validateRequest(
        AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
  );

export const academicFacultyrRoutes = router;