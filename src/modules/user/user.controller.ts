import { NextFunction, Request, RequestHandler, Response } from "express";
// import { UserService } from "./user.service";
// students.service.ts
import { UserService, createStudentIntoDB } from './user.service';
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

// Now you can use createStudentIntoDB as needed in this file

// use higherorder function instead repaeted use of try catch


const createStudent = catchAsync (
    async (req, res,next) => {
 
        const { password, student: studentData } = req.body;
      
        const result = await UserService.createStudentIntoDB (password, studentData);
    
        // res.status(200).json({
        //   success: true,
        //   message: "Student is created succesfully",
        //   data: result,
        // });
    
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success: true,
              message: "Student is created succesfully",
              data: result,
    
        })
    }
)
export const UserControllers = {
  createStudent,
};
