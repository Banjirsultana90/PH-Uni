import { Schema, model } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";
import AppError from "../../app/error/appError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
      },
    
  },
  {
    timestamps: true,
  },
);

// academicDepartmentSchema.pre('save', async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExist) {
//     throw new AppError(httpStatus.NOT_FOUND,
      
//       'This department is already exist!',
//     );
//   }

//   next();
// });

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND,
      
      'This department is already exist!',
    );
  }

  next();
});


export const AcademicDepartment = model<TacademicDepartment>("AcademicDepartment", academicDepartmentSchema);
