
import { TacademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

export const createAcademicFacultyIntoDB=async(payload:TacademicFaculty)=>{
 const result= await AcademicFaculty.create(payload)
return result
}

const getAllAcademicFacultyFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
  };
const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
  };
  
  const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TacademicFaculty>,
  ) => {
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
export const AcademicFacultyServices={
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
    
}