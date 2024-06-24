import { error } from "console";
import { Tacademicsemister } from "./academicSemister.interface";
import { AcademicSemister } from './academicSmister.model';
import { academicSemisterNameCodeMapper } from "./acedemicSemisterConstant";
import AppError from "../../app/error/appError";
import httpStatus from "http-status";

export const createAcademicSemisterIntoDB=async(payload:Tacademicsemister)=>{


// semester name and code mathing
// type TAcademicSemisternameCodemapper=
// {
//     [ key:string]:string
// } this code goes to interface
// const academicSemisterNameCodeMapper:TAcademicSemisternameCodemapper={

//     Autumn:'01',
//     Summer:'02',
//     Fall:'03'
// } this code goes to const 
if (academicSemisterNameCodeMapper[payload.name]!==payload.code){
    throw new AppError(httpStatus.NOT_FOUND,'invalid semister code')
}
 const result= await AcademicSemister.create(payload)
return result


}

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemister.find();
    return result;
  };
const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemister.findById(id);
    return result;
  };
  
  const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<Tacademicsemister>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemisterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester Code');
    }
  
    const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
export const AcademicSemisterServices={
    createAcademicSemisterIntoDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB

}