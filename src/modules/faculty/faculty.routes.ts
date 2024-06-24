
import express from 'express';
import { FacultyControllers } from './faculty.controllers';
import { updateAcademicFacultyValidationSchema } from '../academicFaculty/academicFaculty.validation';
import validateRequest from '../../app/middlewares/validateRequest';
;

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateAcademicFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
