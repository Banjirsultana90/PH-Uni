import { Student } from "./students.model";
import { TStudent } from "./students.interface";
import { error } from "console";
import mongoose from "mongoose";
import AppError from "../../app/error/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import QueryBuilders from "../../app/builders/QuerryBuilders";
import { studentSearchableFields } from "./studentConst";
// this part goes to user service
// const createStudentIntoDB = async (studentData: TStudent) => {
//     // buildin static method
//       // create an custom statics
//   if(await Student.isUserExists(studentData.id)){
//     throw new Error('user already exist')
// }

//   const result = await Student.create(studentData);

// // create an custom instance
// // const student=new Student(studentData)

// // if(await student.isUserExists(studentData.id)){
// //     throw new Error('user already exist')
// // }

// // builtin instance method
// // const result=await student.save()
// //   return result;
// };

const getAllStudentsFromDB = async (query:Record<string,unknown>) => {
  // {name:{$regex:query.searchTerm},$ options:'i'}
// console.log('base querry',query)
// const queryObj={...query}
//   const studentSearchableFields= ['email', 'name.firstName', 'presentAddress']
//   const searchTerm = query?.searchTerm as string || '';

// const searchablequery=Student.find({
//   $or:studentSearchableFields.map((field) => ({
//     [field]: { $regex: searchTerm, $options: 'i' }
//   }))
// })

// // filtering
// const excludesField=['searchTerm','sort','limit','page','fields']

// excludesField.forEach((el)=>{
//   delete queryObj[el]
// })
// // console.log(query,queryObj)
//   const filterQuery =  searchablequery.find(queryObj)
//   .populate('admissionSemister')
//   .populate({
//     path:'academicDepartment',
//     populate:{
//       path:'academicFaculty'
//     }
//   });

//   let sort ='createdAt-1'
//   if(query.sort){
//     sort=query.sort as string
//   }

//   const sortQuery= filterQuery.sort(sort)
//   // return sortQuery;

//   let page=1
//   let limit =1
//   let skip=0
//   if(query.limit){
//     limit=query.limit as number
//   } 

//   if(query.page){
//     page=query.page as number
//     skip=(page-1)*limit
//   }
//   const paginateQuery= sortQuery.skip(skip)
 

//   const limitQuery=paginateQuery.limit(limit)

//   // field filtering
//   let fields='-__v'
//   if(query.fields){
//     fields=(query.fields as string).split(',').join(' ')
//   }

//   const fieldQuery=await limitQuery.select(fields)
//   return fieldQuery;

const studentQuery=new QueryBuilders(Student.find()
.populate('admissionSemister')
  .populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  })
,query)
.search(studentSearchableFields)
.filter()
.sort()
.paginate()
.fields()


const result= await studentQuery.modelQuery
return result


};


const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findById( id );
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateSingleStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
// normal delete
// const deleteSingleStudentFromDB = async (id: string) => {
//   const result = await Student.updateOne({ id }, { isDeleted: true });
//   return result;
// };

const deleteSingleStudentFromDB = async (id: string) => {
  const session=await mongoose.startSession()
  try{
    session.startTransaction()

    const deletedStudent = await Student.findByIdAndUpdate( id , { isDeleted: true },{
      new:true,session
    });
    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST,"student deletion failed");

    }

    const userId=deletedStudent.user
    const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true },{
      new:true,session
    });
    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST,"user deletion failed");

    }
       await session.commitTransaction()
      await session.endSession()
    return deletedStudent;
  } catch (err:any) {
   
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err);
  }
 
};



export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB
};
