import mongoose, { Schema, model } from "mongoose";
import config from "../../app/config";
import bcrypt from "bcrypt"
import { TacademicSemisterCode, TacademicSemisterName, Tacademicsemister, Tmonths } from "./academicSemister.interface";
import { AcademicSemisterCode, AcademicSemisterName, Months } from "./acedemicSemisterConstant";
import AppError from "../../app/error/appError";
import httpStatus from "http-status";

// const Months: Tmonths[] = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December"
//   ];
  
//   const AcademicSemisterName:TacademicSemisterName[]=[
//     'Autumn','Fall','Summer'
//   ]
//   const AcademicSemisterCode:TacademicSemisterCode[]=[
//     '01','02','03'
//   ]

const academicSemisterSchema = new Schema <Tacademicsemister>(
  {
    name: {
      type: String,
      required: true,
      enum:AcademicSemisterName
      
    },
    code: {
      type: String,
      required: true,
      enum:AcademicSemisterCode
    },
    year: {
      type: String,
      required: true,
    },
    startmonth: {
      type: String,
      required: true,
      enum: Months,
     
    },
    endmonth: {
      type: String,
      required: true,
      enum:Months,
     
    },
  
  },
  {
    timestamps: true,
  },
);

academicSemisterSchema.pre('save',async function(next){
  const isSemisterExists=await AcademicSemister.findOne({
    year:this.year,
    name:this.name
  })
  if(isSemisterExists)
    {
      throw new AppError(httpStatus.NOT_FOUND,'semister is exists')
    }
  next()
})

export const AcademicSemister = model<Tacademicsemister>("AcademicSemister", academicSemisterSchema);
