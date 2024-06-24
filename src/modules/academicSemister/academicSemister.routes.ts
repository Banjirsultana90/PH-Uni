import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../app/middlewares/validateRequest";
import { AcademicSemisterControllers } from "./academicSemister.controllers";
import { AcdemicsemisterValidations, createAcademicSemisterValidationSchema } from "./academicsemister.valitation";

const router = express.Router();

// const validateRequest=(schema:AnyZodObject)=>{

//    return async (req:Request, res: Response,next:NextFunction)=>{

//    const zodParseData=await schema.parseAsync({
//     body:req.body
//    })
// next()

// }
  

// }
router.post("/create-academic-semister",validateRequest(createAcademicSemisterValidationSchema), AcademicSemisterControllers.createAcademicSemister);

router.get(
    '/',
    AcademicSemisterControllers.getSingleAcademicSemester,
  );
router.get(
    '/:semesterId',
    AcademicSemisterControllers.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    validateRequest(
        AcdemicsemisterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemisterControllers.updateAcademicSemester,
  );

export const academicSemisterRoutes = router;