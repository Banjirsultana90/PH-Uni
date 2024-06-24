import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject, ZodObject } from "zod";
import validateRequest from "../../app/middlewares/validateRequest";
import { createstudentValidationSchema } from "../students/students.validator";


const router = express.Router();

// const validateRequest=(schema:AnyZodObject)=>{

//    return async (req:Request, res: Response,next:NextFunction)=>{

//    const zodParseData=await schema.parseAsync({
//     body:req.body
//    })
// next()

// }
  

// }
router.post("/create-student", validateRequest( createstudentValidationSchema), UserControllers.createStudent);
// router.get("/create-user", UserControllers.getAllUser);
// router.get("/create-user/:userId", UserControllers.getsingleUser);
// router.delete("/create-user/:userId", UserControllers.deleteUser);

export const userRoutes = router;
