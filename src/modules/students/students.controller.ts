import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./students.service";
import { error } from "console";
import studentValidationSchema from "./students.validator";
import { Error } from "mongoose";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

// as we create student,admin,faculty in user end this creating part goes to user controller

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body
//     const zodParseData=studentValidationSchema.parse(studentData)
//     const result = await StudentServices.createStudentIntoDB(zodParseData);

//     res.status(200).json({
//       success: true,
//       message: 'Student is created succesfully',
//       data: result,
//     });
//   } catch (err:any) {
//     res.status(500).json({
//         success: false,
//         message: err.message||'Student is not created succesfully',
//         error: err,
//       });
//   }
// };

const getAllStudents= catchAsync(
  async (req, res,next) => {
//  console.log(req.query)
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    // res.status(200).json({
    //   success: true,
    //   message: "Students are retrieved succesfully",
    //   data: result,
    // });

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success: true,
        message: "Student are retrieved succesfully",
        data: result,

  })

}
)

const getSingleStudent= catchAsync(
  async (req, res,next) => {
  
    const { id } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success: true,
        message: "Student is retrieved succesfully",
        data: result,

  })

}
)
const deleteStudent = catchAsync(
  async (req, res,next) => {
  
    const { id } = req.params;

    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success: true,
        message: "Student is deleted succesfully",
        data: result,

  })
 
}
)
const updateStudent = catchAsync(
  async (req, res,next) => {
  
    const { id } = req.params;
    const { student } = req.body;

    const result = await StudentServices.updateSingleStudentFromDB(id,student);

    sendResponse(res,{
      statusCode:httpStatus.OK,
      success: true,
        message: "Student is updated succesfully",
        data: result,

  })
 
}
)
export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
