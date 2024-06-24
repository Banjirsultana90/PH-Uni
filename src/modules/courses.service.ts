import QueryBuilders from "../app/builders/QuerryBuilders"
import { CourseSearchableFields } from "./courses.const"
import { TCourse } from "./courses.interface"
import { Course } from "./courses.model"


const createCourseintoDB=async(payload:TCourse)=>{

    const result=await Course.create(payload)
    // console.log(result)
    return result

}

const getAllCoursesfromDB=async(query:Record<string,unknown>)=>{

    const courseQuery= new QueryBuilders( Course.find().populate('preRequisiteCourses.course'),query)
    .search(CourseSearchableFields)
    .filter()
   .sort()
 .paginate()
 .fields()

    const result=await courseQuery.modelQuery;
    // console.log(result)
    return result

}
const getSingleCoursefromDB=async(id:string)=>{

    const result=await Course.findById(id).populate('preRequisiteCourses.course')
    return result

}
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
      },
    );
    return result;
  };

const updateCoursefromDB=async(id:string, payload:Partial<TCourse>)=>{


    const {preRequisiteCourses, 
        ...remaingCourses}=payload

    const result=await Course.findByIdAndUpdate(id)
    return result
}


export const courseServices={
    createCourseintoDB,
    getAllCoursesfromDB,
    getSingleCoursefromDB,
    deleteCourseFromDB,
    updateCoursefromDB
}