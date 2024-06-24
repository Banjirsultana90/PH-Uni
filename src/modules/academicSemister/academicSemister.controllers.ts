import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AcademicSemisterServices } from "./academicSemister.service";

const createAcademicSemister= catchAsync (
    async (req, res,next) => {
 
       
      
        const result = await AcademicSemisterServices.createAcademicSemisterIntoDB (req.body);
    
        // res.status(200).json({
        //   success: true,
        //   message: "Student is created succesfully",
        //   data: result,
        // });
    
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success: true,
              message: "Academic-Semister is created succesfully",
              data: result,
    
        })
    }
)


const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemisterServices.getAllAcademicSemestersFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result =
      await AcademicSemisterServices.getSingleAcademicSemesterFromDB(semesterId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });
  
  const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemisterServices.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });
export const AcademicSemisterControllers = {
    createAcademicSemister,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester
};
