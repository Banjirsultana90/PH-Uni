
import config from "../../app/config";
import { TStudent } from "../students/students.interface";
import { User } from "./user.model";
import { Tuser } from './user.interface';
import { Student } from "../students/students.model";

import { AcademicSemister } from "../academicSemister/academicSmister.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../app/error/appError";
import httpStatus from "http-status";
import mongoose from "mongoose";


const createStudentIntoDB = async (password: string, payload: TStudent) => {

    // create a user object
    const userData: Partial<Tuser> = {};
    // Use default password if not provided
    userData.password = password || (config.default_password as string);
    // Set student role
    userData.role = "student";

    // Find academic semester
    
    const admissionSemister = await AcademicSemister.findById(payload.admissionSemister);
    if (!admissionSemister) {
      throw new AppError(httpStatus.NOT_FOUND,"Academic semester not found");
    }
//create user and student  by using normal method
    // Generate student ID
  //   userData.id = await generateStudentId(admissionSemister);

  //   // Create a user
  //   const newUser = await User.create(userData);

  //   // Create a student
  //   if (Object.keys(newUser).length) {
  //     // Set id and user fields in payload
  //     payload.id = newUser.id;
  //     payload.user = newUser._id;
  //     const newStudent = await Student.create(payload);
  //     return newStudent;
  //   } else {
  //     throw new AppError(httpStatus.NOT_FOUND,"User creation failed");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   throw new AppError(httpStatus.NOT_FOUND,"Failed to create student");
  // }
// create user and student  by using transaction and rollback method


const session=await mongoose.startSession()
try{
  session.startTransaction()
     userData.id = await generateStudentId(admissionSemister);

    // Create a user
    const newUser = await User.create([userData],{session});

    // Create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST,"User creation failed");
      // Set id and user fields in payload
      
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload],{session});
      if(!newStudent){
        throw new AppError(httpStatus.BAD_REQUEST,"student creation failed");
      }

      await session.commitTransaction()
      await session.endSession()
      return newStudent;
  } 
 catch (err) {
   
  await session.abortTransaction()
  await session.endSession()
  throw new Error('Failed to create student');
}

  
};

export const UserService = {
  createStudentIntoDB,
};
