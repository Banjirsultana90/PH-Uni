import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";


const createAcademicFacultyIntoDB= catchAsync (
    async (req, res,next) => {
 
        const result = await AcademicFacultyServices.createAcademicFacultyIntoDB (req.body);
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success: true,
              message: "Academic-Faculty is created succesfully",
              data: result,
    
        })
    }
)


const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is retrieved succesfully',
      data: result,
    });
  });
  
  const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
        facultyId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is updated succesfully',
      data: result,
    });
  });
export const AcademicFacultyControllers = {
    createAcademicFacultyIntoDB,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
};
