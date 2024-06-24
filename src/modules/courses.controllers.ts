import httpStatus from "http-status";

import { courseServices } from "./courses.service";
import catchAsync from "../app/utils/catchAsync";
import sendResponse from "../app/utils/sendResponse";


const createCourseIntoDB= catchAsync (
    async (req, res,next) => {
 
        const result = await courseServices.createCourseintoDB (req.body);
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success: true,
              message: "Courses is created succesfully",
              data: result,
    
        })
    }
)


const getAllCourses = catchAsync(async (req, res) => {
    const result = await courseServices.getAllCoursesfromDB(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await courseServices.getSingleCoursefromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses is retrieved succesfully',
      data: result,
    });
  });

  const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await courseServices.deleteCourseFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses is deleted succesfully',
      data: result,
    });
  });
  
  
  const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseServices.updateCoursefromDB(
        id,
    //   req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is updated succesfully',
      data: result,
    });
  });
export const CourseControllers = {
    createCourseIntoDB,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse
};
